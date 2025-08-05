import { Component, OnInit } from '@angular/core';
import { FilterComponent } from "./filter-card/filter-card";
import { PropertyCard } from "./property-card/property-card";
import { CommonModule } from '@angular/common';
import { PropertyListService } from '../../../core/services/property-list.service/property-list.service';
import { PropertyFilterResponse, Property } from '../../../core/services/property-list.service/property-filter.model';
import { PropertyFilterRequest } from '../../../core/services/property-list.service/property-filter.model';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FilterComponent, PropertyCard, CommonModule],
  templateUrl: './property-list.html'
})
export class PropertyList implements OnInit {

  heroBackgroundImage = 'url(assets/images/bg/01.jpg)';
  properties: Property[] = [];
  loading = false;
  error = '';

  // Pagination State
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;

  // Filters
  currentFilters: PropertyFilterRequest = {};

  constructor(private propertyListService: PropertyListService) {
    console.log('PropertyList component initialized');
  }

  ngOnInit() {
    console.log('PropertyList ngOnInit called');
    this.testAPI();
    this.getFiltered();
  }

  testAPI() {
    console.log('Testing API endpoints...');
    
    // Test property types
    this.propertyListService.getPropertyTypes().subscribe({
      next: (types) => console.log('✅ PropertyTypes API working:', types),
      error: (error) => console.error('❌ PropertyTypes API failed:', error)
    });

    // Test services
    this.propertyListService.getServices().subscribe({
      next: (services) => console.log('✅ Services API working:', services),
      error: (error) => console.error('❌ Services API failed:', error)
    });

    // Test locations
    this.propertyListService.getLocations().subscribe({
      next: (locations) => console.log('✅ Locations API working:', locations),
      error: (error) => console.error('❌ Locations API failed:', error)
    });
  }

  getFiltered(page: number = 1, filters: PropertyFilterRequest = this.currentFilters) {
    console.log('getFiltered called with:', { page, filters });
    this.loading = true;
    this.error = '';
    this.currentPage = page;
    this.currentFilters = filters;

    const requestPayload: PropertyFilterRequest = {
      ...filters,
      PageNumber: this.currentPage,
      PageSize: this.pageSize
    };

    console.log('Making API call with payload:', requestPayload);

    this.propertyListService.getFilteredProperties(requestPayload).subscribe({
      next: (response: PropertyFilterResponse) => {
        console.log('API response received:', response);
        this.properties = response.items || [];
        this.totalPages = response.totalPages || Math.ceil((response.totalCount || 0) / this.pageSize);
        this.loading = false;
        console.log('Properties loaded:', this.properties.length);
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
        this.error = 'Failed to load properties. Please try again.';
        this.properties = [];
        this.totalPages = 1;
        this.loading = false;
        
        // Fallback: Load mock data for testing
        this.loadMockData();
      }
    });
  }

  loadMockData() {
    console.log('Loading mock data for testing...');
    const mockProperties: Property[] = [
      {
        id: 1,
        title: 'Luxury Apartment in Downtown',
        description: 'Beautiful 2-bedroom apartment with city views',
        propertyTypeId: 1,
        country: 'Egypt',
        city: 'Cairo',
        district: 'Maadi',
        buildingNo: 123,
        level: 5,
        flatNo: 10,
        longitude: 31.2357,
        latitude: 30.0444,
        roomCount: 2,
        bathroomCount: 2,
        space: 120,
        price: 1500,
        peopleCapacity: 4,
        mainImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500',
        images: [],
        status: 1,
        propertyTypeName: 'Apartment',
        imageUrls: [],
        averageRating: 4.5,
        reviewsCount: 12,
        serviceNames: ['WiFi', 'Parking'],
        services: [
          { id: 1, name: 'WiFi', icon: 'fas fa-wifi' },
          { id: 2, name: 'Parking', icon: 'fas fa-parking' }
        ]
      },
      {
        id: 2,
        title: 'Modern Villa with Pool',
        description: 'Spacious villa with private pool and garden',
        propertyTypeId: 2,
        country: 'Egypt',
        city: 'Cairo',
        district: 'Zamalek',
        buildingNo: 456,
        level: 1,
        flatNo: 1,
        longitude: 31.2357,
        latitude: 30.0444,
        roomCount: 4,
        bathroomCount: 3,
        space: 250,
        price: 3000,
        peopleCapacity: 8,
        mainImageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
        images: [],
        status: 1,
        propertyTypeName: 'Villa',
        imageUrls: [],
        averageRating: 4.8,
        reviewsCount: 8,
        serviceNames: ['WiFi', 'Pool', 'Gym'],
        services: [
          { id: 1, name: 'WiFi', icon: 'fas fa-wifi' },
          { id: 3, name: 'Pool', icon: 'fas fa-swimming-pool' },
          { id: 4, name: 'Gym', icon: 'fas fa-dumbbell' }
        ]
      }
    ];

    this.properties = mockProperties;
    this.totalPages = 1;
    this.loading = false;
    console.log('Mock data loaded:', this.properties.length, 'properties');
  }

  onFilterApplied(filter: PropertyFilterRequest) {
    console.log('Filter applied:', filter);
    this.getFiltered(1, filter); // Reset to page 1 with new filters
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getFiltered(page);
    }
  }
}
