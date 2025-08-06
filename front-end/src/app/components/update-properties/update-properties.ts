import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from "../../shared/card/card";
import { Carousel } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IpropertyType } from '../../core/interfaces/iproperty-type';
import { DialogModule } from 'primeng/dialog';
import { Map } from '../map/map';
import { Amenities } from '../amenities/amenities';
import { AddPropertyRequest } from '../../core/interfaces/AddPropertyDTO';
import { UpdatePropertyService } from '../../core/services/updateproperty.service';

import { Amenity } from '../../core/interfaces/Amenity';
import { PropertyResponse } from '../../core/interfaces/getProperty';

@Component({
  selector: 'app-update-property',
  imports: [Carousel, CommonModule, FormsModule, DialogModule, Map, Amenities],
  templateUrl: './update-properties.html',
  styleUrl: './update-properties.css'
})
export class UpdateProperty implements OnInit, OnDestroy {

  property: AddPropertyRequest = {
    Title: '',
    Description: '',
    PropertyTypeId: 0,
    Country: '',
    City: '',
    District: '',
    BuildingNo: 0,
    Level: 0,
    FlatNo: 0,
    Longitude: 0,
    Latitude: 0,
    RoomCount: 0,
    BathroomCount: 0,
    Space: 0,
    Price: 0,
    PeopleCapacity: 0,
    MainImage: null,
    Images: [],
    ServiceIds: []
  };

  propertyType: IpropertyType[] = [
    { id: '1', name: 'Apartment' },
    { id: '2', name: 'House' },
    { id: '3', name: 'Villa' },
    { id: '4', name: 'Studio' },
    { id: '5', name: 'Penthouse' }
  ];

  mapVisible: boolean = false;
  amenitiesVisible: boolean = false;
  selectedLocationSummary: string = '';
  propertyId: number = 0;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  existingImages: string[] = [];
  originalProperty: PropertyResponse | null = null;
  hasUnsavedChanges: boolean = false;
  imageLoadStates: { [key: number]: { loaded: boolean; error: boolean; url?: string } } = {};
  hasImageError: { [key: number]: boolean } = {};
  private objectUrls: string[] = [];
  selectedMainImageUrl: string | null = null;
  private _lastImageCount: number = 0;
  private imageUrlCache: { [key: string]: string } = {};

  constructor(
    private updatePropertyService: UpdatePropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get property ID from route parameters
    this.route.params.subscribe(params => {
      this.propertyId = +params['id'];
      if (this.propertyId) {
        this.loadPropertyData();
      } else {
        // Invalid ID, redirect to host dashboard
        this.router.navigate(['/host']);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up object URLs to prevent memory leaks
    this.cleanupObjectUrls();
  }

  loadPropertyData(): void {
    this.isLoading = true;
    
    this.updatePropertyService.getProperty(this.propertyId).subscribe({
      next: (existingProperty: PropertyResponse) => {
        this.originalProperty = existingProperty;
        this.populateFormWithExistingData(existingProperty);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.isLoading = false;
        alert('Error loading property data. Please try again.');
      }
    });
  }

  private populateFormWithExistingData(existingProperty: PropertyResponse): void {
    console.log('🔍 Populating form with existing property data:', existingProperty);
    // Map the existing property data to our form model (API uses camelCase, form uses PascalCase)
    this.property = {
      Title: existingProperty.title || '',
      Description: existingProperty.description || '',
      PropertyTypeId: existingProperty.propertyTypeId || 0,
      Country: existingProperty.country || '',
      City: existingProperty.city || '',
      District: existingProperty.district || '',
      BuildingNo: existingProperty.buildingNo || 0,
      Level: existingProperty.level || 0,
      FlatNo: existingProperty.flatNo || 0,
      Longitude: existingProperty.longitude || 0,
      Latitude: existingProperty.latitude || 0,
      RoomCount: existingProperty.roomCount || 0,
      BathroomCount: existingProperty.bathroomCount || 0,
      Space: existingProperty.space || 0,
      Price: existingProperty.price || 0,
      PeopleCapacity: existingProperty.peopleCapacity || 0,
      MainImage: null,
      Images: [],
      ServiceIds: existingProperty.services?.map(s => s.id) || []
    };
    
    console.log('🔧 Form initialized with empty Images array:', this.property?.Images?.length);

    // Set location summary
    if (this.property.City && this.property.District && this.property.Country) {
      this.selectedLocationSummary = `${this.property.City}, ${this.property.District}, ${this.property.Country}`;
    }

    // Handle existing images (API returns array of image URLs)
    if (existingProperty.images && existingProperty.images.length > 0) {
      this.existingImages = existingProperty.images;
      console.log('📷 Existing images loaded:', this.existingImages);
      
      // Set the main image from API response
      if (existingProperty.mainImageUrl) {
        this.selectedMainImageUrl = existingProperty.mainImageUrl;
        console.log('⭐ Main image URL set from API:', this.selectedMainImageUrl);
      } else if (this.existingImages.length > 0) {
        // Fallback: Set the first existing image as main image if no main image URL from API
        this.selectedMainImageUrl = this.existingImages[0];
        console.log('⭐ Main image URL set to first image:', this.selectedMainImageUrl);
      }
    } else {
      console.log('❌ No existing images found in API response');
    }

    // Mark form as clean initially
    this.hasUnsavedChanges = false;
  }

  // Remove the safeParseNumber method as it's no longer needed

  // Track form changes
  onFormChange(): void {
    this.hasUnsavedChanges = true;
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const newImages = Array.from(input.files);
      
      // Validate image files
      const validImages = newImages.filter(file => {
        if (!file.type.startsWith('image/')) {
          console.warn('Skipping non-image file:', file.name);
          return false;
        }
        return true;
      });
      
      if (validImages.length === 0) {
        alert('Please select valid image files only.');
        return;
      }
      
      // Append new images to existing ones instead of replacing
      const currentImages = this.property.Images || [];
      this.property.Images = [...currentImages, ...validImages];
      
      // Initialize image load states for new images
      const startIndex = currentImages.length;
      validImages.forEach((_, index) => {
        const actualIndex = startIndex + index;
        this.hasImageError[actualIndex] = false;
      });
      
      // Set first image as main if no main image is selected
      if (!this.hasMainImageSelected() && this.getAllImages().length > 0) {
        const firstImage = this.getAllImages()[0];
        this.setMainImage(firstImage);
        console.log('🎯 Auto-selected main image:', firstImage);
      }
      
      this.onFormChange();
      console.log('🖼️ Images added:', validImages.length, 'files');
      console.log('📝 Total images now:', this.property.Images.length);
      
      // Reset the input
      input.value = '';
    }
  }

  private cleanupObjectUrls(): void {
    this.objectUrls.forEach(url => {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.warn('Error revoking object URL:', error);
      }
    });
    this.objectUrls = [];
    this.imageUrlCache = {};
  }

  getImagePreview(file: File): string {
    if (!file || !(file instanceof File)) {
      console.warn('getImagePreview: Invalid file object:', file);
      return '';
    }
    
    // Create a unique key for the file
    const fileKey = `${file.name}_${file.size}_${file.lastModified}`;
    
    // Check if we already have a cached URL for this file
    if (this.imageUrlCache[fileKey]) {
      return this.imageUrlCache[fileKey];
    }
    
    console.log('Creating object URL for file:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });
    
    try {
      const objectUrl = URL.createObjectURL(file);
      this.objectUrls.push(objectUrl);
      this.imageUrlCache[fileKey] = objectUrl;
      console.log('✅ Object URL created successfully:', objectUrl);
      return objectUrl;
    } catch (error) {
      console.error('❌ Error creating object URL for file:', file.name, error);
      return '';
    }
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    const index = this.getCurrentImageIndex(img);
    if (index !== -1) {
      this.imageLoadStates[index] = { loaded: true, error: false };
      console.log(`Image ${index} loaded successfully`);
    }
  }

  onImageError(event: Event, index: number): void {
    this.imageLoadStates[index] = { loaded: false, error: true };
    console.error(`Failed to load image at index ${index}`);
  }

  retryImageLoad(index: number): void {
    this.imageLoadStates[index] = { loaded: false, error: false };
    // Force re-render by temporarily clearing and resetting the image
    setTimeout(() => {
      const img = document.querySelector(`img[alt="Property Image ${index + 1}"]`) as HTMLImageElement;
      if (img && this.property.Images && this.property.Images[index]) {
        img.src = this.getImagePreview(this.property.Images[index]);
      }
    }, 100);
  }

  private getCurrentImageIndex(img: HTMLImageElement): number {
    const altText = img.alt;
    const match = altText.match(/Property Image (\d+)/);
    return match ? parseInt(match[1]) - 1 : -1;
  }

  onImageLoadSimple(index: number, event: Event): void {
    console.log(`✅ Image ${index} loaded successfully:`, event);
    this.hasImageError[index] = false;
  }

  onImageErrorSimple(index: number, event: Event): void {
    console.error(`❌ Image ${index} failed to load:`, event);
    this.hasImageError[index] = true;
    
    // Let's also log the src URL to debug
    const img = event.target as HTMLImageElement;
    console.error(`Failed URL:`, img.src);
  }

  // New methods for handling combined image display
  getAllImages(): any[] {
    const allImages: any[] = [];
    
    // Add existing images
    if (this.existingImages && this.existingImages.length > 0) {
      this.existingImages.forEach(url => {
        allImages.push({
          type: 'existing',
          url: url,
          id: url // Use URL as unique identifier
        });
      });
    }
    
    // Add new uploaded images
    if (this.property.Images && this.property.Images.length > 0) {
      this.property.Images.forEach(file => {
        allImages.push({
          type: 'new',
          file: file,
          id: file.name + file.lastModified // Unique identifier for file
        });
      });
    }
    
    // Only log once when images change
    if (allImages.length !== this._lastImageCount) {
      console.log('🖼️ getAllImages() returning:', allImages.length, 'images:', allImages);
      this._lastImageCount = allImages.length;
    }
    
    return allImages;
  }

  getImageSrc(imageData: any): string {
    if (imageData.type === 'existing') {
      return imageData.url;
    } else if (imageData.type === 'new') {
      return this.getImagePreview(imageData.file);
    }
    console.warn('⚠️ Unknown image data type:', imageData);
    return '';
  }

  getImageAlt(imageData: any, index: number): string {
    if (imageData.type === 'existing') {
      return `Property Image ${index + 1}`;
    } else if (imageData.type === 'new') {
      return imageData.file.name;
    }
    return `Image ${index + 1}`;
  }

  isMainImage(imageData: any): boolean {
    if (imageData.type === 'existing') {
      // For existing images, check if this URL matches the selected main image URL
      return this.selectedMainImageUrl === imageData.url;
    } else if (imageData.type === 'new') {
      // For new images, check if this file matches the selected main image file
      return this.property.MainImage === imageData.file;
    }
    return false;
  }

  setMainImage(imageData: any): void {
    console.log('Setting main image:', imageData);
    
    if (imageData.type === 'existing') {
      // User selected an existing image as main
      this.selectedMainImageUrl = imageData.url;
      this.property.MainImage = null; // Clear any new file selection
      console.log('✅ Selected existing image as main:', imageData.url);
    } else if (imageData.type === 'new') {
      // User selected a new uploaded image as main  
      this.property.MainImage = imageData.file;
      this.selectedMainImageUrl = null; // Clear any existing URL selection
      console.log('✅ Selected new image as main:', imageData.file.name);
    }
    
    this.onFormChange();
  }

  hasMainImageSelected(): boolean {
    return !!(this.selectedMainImageUrl || this.property.MainImage);
  }

  // Method to toggle favorite/main image (for compatibility with your example)
  toggleFavorite(imageData: any): void {
    this.setMainImage(imageData);
  }

  // Remove an image from the list (both existing and new)
  removeImage(imageData: any): void {
    if (imageData.type === 'existing') {
      const index = this.existingImages.indexOf(imageData.url);
      if (index > -1) {
        this.existingImages.splice(index, 1);
        
        // Add to removal list for backend
        if (!this.property.ImageUrlsToRemove) {
          this.property.ImageUrlsToRemove = [];
        }
        this.property.ImageUrlsToRemove.push(imageData.url);
        
        console.log('🗑️ Marked existing image for removal:', imageData.url);
        
        // If this was the main image, reset main image selection
        if (this.selectedMainImageUrl === imageData.url) {
          this.selectedMainImageUrl = null;
          
          // Auto-select the first remaining image as main if available
          const allImages = this.getAllImages();
          if (allImages.length > 0) {
            this.setMainImage(allImages[0]);
          }
        }
        
        this.onFormChange();
      }
    } else if (imageData.type === 'new') {
      const index = this.property.Images?.indexOf(imageData.file);
      if (index !== undefined && index > -1 && this.property.Images) {
        this.property.Images.splice(index, 1);
        console.log('🗑️ Removed new image:', imageData.file.name);
        
        // If this was the main image, reset main image selection
        if (this.property.MainImage === imageData.file) {
          this.property.MainImage = null;
          
          // Auto-select the first remaining image as main if available
          const allImages = this.getAllImages();
          if (allImages.length > 0) {
            this.setMainImage(allImages[0]);
          }
        }
        
        this.onFormChange();
      }
    }
  }

  // Keep the old method for backward compatibility (existing template might use it)
  removeExistingImage(imageData: any): void {
    this.removeImage(imageData);
  }

  // Note: urlToFile methods removed since backend now handles image preservation

  async updateProperty(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    
    const updatePayload = { ...this.property };
    
    // Check what actually changed
    const hasNewUploadedImages = this.property.Images && this.property.Images.length > 0;
    const mainImageChangedToExisting = this.selectedMainImageUrl !== this.originalProperty?.mainImageUrl;
    const mainImageChangedToNew = this.property.MainImage !== null;
    const hasRemovedExistingImages = this.originalProperty?.images && 
      this.originalProperty.images.length > this.existingImages.length;
    
    console.log('Change detection:', {
      hasNewUploadedImages,
      mainImageChangedToExisting,
      mainImageChangedToNew,
      hasRemovedExistingImages,
      selectedMainImageUrl: this.selectedMainImageUrl,
      originalMainImageUrl: this.originalProperty?.mainImageUrl,
      originalImageCount: this.originalProperty?.images?.length || 0,
      currentExistingImageCount: this.existingImages.length
    });
    
    // ✅ SIMPLIFIED: Let backend handle image preservation
    console.log('🔄 Preparing image updates for backend');
    
    // Set new main image if user selected a new file
    if (this.property.MainImage) {
      updatePayload.MainImage = this.property.MainImage;
      updatePayload.MainImageUrl = undefined; // Clear existing URL when uploading new file
    } else if (mainImageChangedToExisting && this.selectedMainImageUrl) {
      // User changed main image to an existing one - send the URL
      updatePayload.MainImage = null;
      updatePayload.MainImageUrl = this.selectedMainImageUrl;
      console.log('🎯 Setting existing image as main:', this.selectedMainImageUrl);
    } else {
      updatePayload.MainImage = null;
      updatePayload.MainImageUrl = undefined;
    }
    
    // Add any new uploaded images (backend will append them to existing ones)
    if (this.property.Images && this.property.Images.length > 0) {
      updatePayload.Images = this.property.Images;
    } else {
      updatePayload.Images = [];
    }
    
    // Send list of removed image URLs
    updatePayload.ImageUrlsToRemove = this.property.ImageUrlsToRemove || [];
    
    // Flag to indicate we're doing an incremental update (not replacing all)
    updatePayload.ReplaceAllImages = false;
    
    console.log('Sending to backend:', {
      hasMainImage: !!updatePayload.MainImage,
      hasImages: !!updatePayload.Images,
      mainImageName: updatePayload.MainImage?.name,
      mainImageUrl: updatePayload.MainImageUrl,
      imagesCount: updatePayload.Images?.length || 0
    });
    
    this.updatePropertyService.updateProperty(this.propertyId, updatePayload).subscribe({
      next: (response) => {
        console.log('Property updated successfully', response);
        this.isSubmitting = false;
        this.hasUnsavedChanges = false;
        
        // Show success message
        alert('Property updated successfully!');
        
        // Clear uploaded images since they're now saved and will be loaded as existing images
        this.property.Images = [];
        this.property.MainImage = null;
        
        // Navigate to host dashboard after successful update
        this.router.navigate(['/host']);
      },
      error: (error) => {
        console.error('Error updating property', error);
        this.isSubmitting = false;
        
        // Handle validation errors from backend
        if (error.error?.error && Array.isArray(error.error.error)) {
          const errorMessages = error.error.error.join('\n');
          alert(`Validation Error: \n${errorMessages}`);
        } else if (error.error?.message) {
          alert(`Error: ${error.error.message}`);
        } else {
          alert('Error updating property. Please try again.');
        }
      }
    });
  }

  private validateForm(): boolean {
    // Check required fields
    if (!this.property.Title?.trim()) {
      alert('Please enter a property title');
      return false;
    }

    if (!this.property.Description?.trim()) {
      alert('Please enter a property description');
      return false;
    }

    if (!this.property.PropertyTypeId || this.property.PropertyTypeId === 0) {
      alert('Please select a property type');
      return false;
    }

    if (!this.selectedLocationSummary) {
      alert('Please select a location');
      return false;
    }

    if (!this.property.BuildingNo || this.property.BuildingNo <= 0) {
      alert('Please enter a valid building number');
      return false;
    }

    if (!this.property.Level || this.property.Level <= 0) {
      alert('Please enter a valid floor level');
      return false;
    }

    if (!this.property.FlatNo || this.property.FlatNo <= 0) {
      alert('Please enter a valid flat number');
      return false;
    }

    if (!this.property.Space || this.property.Space <= 0) {
      alert('Please enter a valid area');
      return false;
    }

    if (!this.property.PeopleCapacity || this.property.PeopleCapacity <= 0) {
      alert('Please enter a valid people capacity');
      return false;
    }

    if (this.property.RoomCount === null || this.property.RoomCount === undefined) {
      alert('Please enter number of bedrooms');
      return false;
    }

    if (!this.property.BathroomCount || this.property.BathroomCount <= 0) {
      alert('Please enter number of bathrooms');
      return false;
    }

    if (!this.property.Price || this.property.Price <= 0) {
      alert('Please enter a valid price');
      return false;
    }

    return true;
  }

  onLocationSelected(location: any): void {
    this.property.Latitude = location.latitude;
    this.property.Longitude = location.longitude;
    this.property.District = location.district;
    this.property.City = location.city;
    this.property.Country = location.country;

    this.selectedLocationSummary = `${location.city}, ${location.district}, ${location.country}`;
    this.mapVisible = false;
    this.onFormChange();
  }

  amenities: Amenity[] = [
    { id: 1, name: 'Wi-Fi', icon: 'fa-solid fa-wifi' },
    { id: 2, name: 'Air Conditioning', icon: 'fa-solid fa-snowflake' },
    { id: 3, name: 'Heating', icon: 'fa-solid fa-temperature-high' },
    { id: 4, name: 'Kitchen', icon: 'fa-solid fa-utensils' },
    { id: 5, name: 'Washer', icon: 'fa-solid fa-soap' },
    { id: 6, name: 'Dryer', icon: 'fa-solid fa-tshirt' },
    { id: 7, name: 'TV', icon: 'fa-solid fa-tv' },
    { id: 8, name: 'Parking', icon: 'fa-solid fa-square-parking' },
    { id: 9, name: 'Swimming Pool', icon: 'fa-solid fa-water-ladder' },
    { id: 10, name: 'Gym', icon: 'fa-solid fa-dumbbell' },
    { id: 11, name: 'Balcony', icon: 'fa-solid fa-chair' },
    { id: 12, name: 'Elevator', icon: 'fa-solid fa-arrow-up' },
    { id: 13, name: 'Pet Friendly', icon: 'fa-solid fa-paw' },
    { id: 14, name: 'Smoking Allowed', icon: 'fa-solid fa-smoking' },
    { id: 15, name: 'BBQ Grill', icon: 'fa-solid fa-fire' },
    { id: 16, name: 'Security', icon: 'fa-solid fa-shield-halved' },
    { id: 17, name: 'Wheelchair Accessible', icon: 'fa-solid fa-wheelchair' },
    { id: 18, name: 'Garden', icon: 'fa-solid fa-tree' },
    { id: 19, name: 'Fireplace', icon: 'fa-solid fa-fire-flame-curved' },
    { id: 20, name: 'Hot Tub', icon: 'fa-solid fa-hot-tub' }
  ];

  getSelectedAmenityNames(): string[] {
    return this.amenities
      .filter(a => this.property.ServiceIds?.includes(a.id) ?? false)
      .map(a => a.name);
  }

  openAmenitiesDialog(): void {
    this.amenitiesVisible = true;
  }

  onServicesSelected(ids: number[]): void {
    this.property.ServiceIds = ids;
    this.onFormChange();
  }

  // Navigation helpers
  goBack(): void {
    if (this.hasUnsavedChanges) {
      const confirmLeave = confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) {
        return;
      }
    }
    this.router.navigate(['/host']);
  }

  resetForm(): void {
    if (this.originalProperty) {
      const confirmReset = confirm('Are you sure you want to reset all changes?');
      if (confirmReset) {
        this.populateFormWithExistingData(this.originalProperty);
      }
    }
  }
}