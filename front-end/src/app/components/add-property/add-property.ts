import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Carousel } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IpropertyType } from '../../core/interfaces/iproperty-type';
import { DialogModule } from 'primeng/dialog';
import { Map } from '../map/map';
import { Amenities } from '../amenities/amenities';
import { AddPropertyRequest } from '../../core/interfaces/AddPropertyDTO';
import { PropertyService } from '../../core/services/addproperty.service';

import { Amenity } from '../../core/interfaces/Amenity';

@Component({
  selector: 'app-add-property',
  imports: [Carousel, CommonModule, FormsModule, DialogModule, Map, Amenities],
  templateUrl: './add-property.html',
  styleUrl: './add-property.css'
})
export class AddProperty implements OnDestroy {

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
  
  // Image preview handling
  private objectUrls: string[] = [];
  private imageUrlCache: { [key: string]: string } = {};

  constructor(private propertyService: PropertyService, private router: Router) { }

  ngOnDestroy(): void {
    // Clean up object URLs to prevent memory leaks
    this.cleanupObjectUrls();
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
    
    try {
      const objectUrl = URL.createObjectURL(file);
      this.objectUrls.push(objectUrl);
      this.imageUrlCache[fileKey] = objectUrl;
      return objectUrl;
    } catch (error) {
      console.error('Error creating object URL for file:', file.name, error);
      return '';
    }
  }

  // Image management methods (like update-properties)
  getAllImages(): any[] {
    const allImages: any[] = [];
    
    // Add uploaded images
    if (this.property.Images && this.property.Images.length > 0) {
      this.property.Images.forEach(file => {
        allImages.push({
          type: 'new',
          file: file,
          id: file.name + file.lastModified // Unique identifier for file
        });
      });
    }
    
    return allImages;
  }

  getImageSrc(imageData: any): string {
    if (imageData.type === 'new') {
      return this.getImagePreview(imageData.file);
    }
    console.warn('⚠️ Unknown image data type:', imageData);
    return '';
  }

  getImageAlt(imageData: any, index: number): string {
    if (imageData.type === 'new') {
      return imageData.file.name;
    }
    return `Image ${index + 1}`;
  }

  isMainImage(imageData: any): boolean {
    if (imageData.type === 'new') {
      return this.property.MainImage === imageData.file;
    }
    return false;
  }

  setMainImage(imageData: any): void {
    console.log('Setting main image:', imageData);
    
    if (imageData.type === 'new') {
      this.property.MainImage = imageData.file;
      console.log('✅ Selected new image as main:', imageData.file.name);
    }
  }

  toggleFavorite(imageData: any): void {
    this.setMainImage(imageData);
  }

  hasMainImageSelected(): boolean {
    return !!this.property.MainImage;
  }

  // Remove an image from the list
  removeImage(imageData: any): void {
    if (imageData.type === 'new') {
      const index = this.property.Images?.indexOf(imageData.file);
      if (index !== undefined && index > -1 && this.property.Images) {
        this.property.Images.splice(index, 1);
        console.log('🗑️ Removed image:', imageData.file.name);
        
        // If this was the main image, reset main image selection
        if (this.property.MainImage === imageData.file) {
          this.property.MainImage = null;
          
          // Auto-select the first remaining image as main if available
          const allImages = this.getAllImages();
          if (allImages.length > 0) {
            this.setMainImage(allImages[0]);
          }
        }
      }
    }
  }

  // This method handles file input selection for multiple images
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
      
      // Set first image as main if no main image is selected
      if (!this.hasMainImageSelected() && this.getAllImages().length > 0) {
        const firstImage = this.getAllImages()[0];
        this.setMainImage(firstImage);
        console.log('🎯 Auto-selected main image:', firstImage);
      }
      
      console.log('🖼️ Images added:', validImages.length, 'files');
      console.log('📝 Total images now:', this.property.Images.length);
      
      // Reset the input
      input.value = '';
    }
  }

  addProperty(): void {
    // Validation before submitting
    if (!this.validateForm()) {
      return;
    }

    console.log('Submitting property:', this.property);
    
    this.propertyService.addProperty(this.property)
      .subscribe({
        next: res => {
          console.log('Property added successfully', res);
          // Navigate to host dashboard after successful property addition
          this.router.navigate(['/host']);
        },
        error: err => {
          console.error('Error adding property', err);
          // Handle error - show error message to user
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

    if (!this.property.RoomCount && this.property.RoomCount !== 0) {
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

    if (!this.property.Images || this.property.Images.length === 0) {
      alert('Please upload at least one image');
      return false;
    }

    if (!this.property.MainImage) {
      alert('Please select a main image');
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
  }
}