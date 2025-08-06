import { Component, OnInit } from '@angular/core';
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
import { FilePreviewPipe } from '../../core/Pipes/file-preview.pipe';
import { Amenity } from '../../core/interfaces/Amenity';
import { PropertyResponse } from '../../core/interfaces/getProperty';

@Component({
  selector: 'app-update-property',
  imports: [Carousel, CommonModule, FormsModule, DialogModule, Map, Amenities, FilePreviewPipe],
  templateUrl: './update-properties.html',
  styleUrl: './update-properties.css'
})
export class UpdateProperty implements OnInit {

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
        // Invalid ID, redirect to properties list
        this.router.navigate(['/properties']);
      }
    });
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

    // Set location summary
    if (this.property.City && this.property.District && this.property.Country) {
      this.selectedLocationSummary = `${this.property.City}, ${this.property.District}, ${this.property.Country}`;
    }

    // Handle existing images (API returns array of image URLs)
    if (existingProperty.images && existingProperty.images.length > 0) {
      this.existingImages = existingProperty.images;
    }

    // Mark form as clean initially
    this.hasUnsavedChanges = false;
  }

  // Remove the safeParseNumber method as it's no longer needed

  // Track form changes
  onFormChange(): void {
    this.hasUnsavedChanges = true;
  }

  setMainImage(image: File): void {
    this.property.MainImage = image;
    this.onFormChange();
    console.log('Main image set:', image);
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const newImages = Array.from(input.files);
      this.property.Images = newImages;
      
      // Automatically set the first new image as main image if none is selected
      if (!this.property.MainImage && this.property.Images.length > 0) {
        this.property.MainImage = this.property.Images[0];
      }
      
      this.onFormChange();
      console.log('New images selected:', this.property.Images);
    }
  }

  updateProperty(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    console.log('Updating property:', this.property);
    
    this.updatePropertyService.updateProperty(this.propertyId, this.property).subscribe({
      next: (response) => {
        console.log('Property updated successfully', response);
        this.isSubmitting = false;
        this.hasUnsavedChanges = false;
        
        // Show success message
        alert('Property updated successfully!');
        
        // Reload the updated data
        this.loadPropertyData();
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
      .filter(a => this.property.ServiceIds.includes(a.id))
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
    this.router.navigate(['/properties']);
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