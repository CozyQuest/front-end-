import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PropertyListService } from '../../../../core/services/property-list.service/property-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyType, Service } from '../../../../core/services/property-list.service/property-filter.model';
import { PropertyFilterRequest } from '../../../../core/services/property-list.service/property-filter.model';

interface City {
  city: string;
  districts: string[];
}

interface Location {
  country: string;
  cities: City[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter-card.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FilterComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<PropertyFilterRequest>();

  locations: Location[] = [];
  cities: string[] = [];
  districts: string[] = [];
  propertyTypes: PropertyType[] = [];
  services: Service[] = [];

  // Filter form values
  country: string = '';
  city: string = '';
  district: string = '';
  search: string = '';
  selectedPropertyTypeIds: number[] = [];
  selectedServiceIds: number[] = [];
  minRoomCount: number | null = null;
  maxPrice: number | null = null;
  minPeople: number | null = null;

  constructor(private propertyListService: PropertyListService) {
    console.log('FilterComponent initialized');
  }

  ngOnInit(): void {
    console.log('FilterComponent ngOnInit called');
    this.loadLocations();
    this.loadPropertyTypes();
    this.loadServices();
  }

  loadLocations(): void {
    console.log('Loading locations...');
    this.propertyListService.getLocations().subscribe({
      next: (res: Location[]) => {
        console.log('Locations loaded:', res);
        this.locations = res;
      },
      error: (error) => {
        console.error('Error loading locations:', error);
        this.loadMockLocations();
      }
    });
  }

  loadPropertyTypes(): void {
    console.log('Loading property types...');
    this.propertyListService.getPropertyTypes().subscribe({
      next: (types: PropertyType[]) => {
        console.log('Property types loaded:', types);
        this.propertyTypes = types;
      },
      error: (error) => {
        console.error('Error loading property types:', error);
        this.loadMockPropertyTypes();
      }
    });
  }

  loadServices(): void {
    console.log('Loading services...');
    this.propertyListService.getServices().subscribe({
      next: (services: Service[]) => {
        console.log('Services loaded:', services);
        this.services = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.loadMockServices();
      }
    });
  }

  loadMockLocations(): void {
    console.log('Loading mock locations...');
    this.locations = [
      {
        country: 'Egypt',
        cities: [
          {
            city: 'Cairo',
            districts: ['Maadi', 'Zamalek', 'Heliopolis', 'Nasr City']
          },
          {
            city: 'Alexandria',
            districts: ['Miami', 'Stanley', 'Sidi Gaber']
          }
        ]
      }
    ];
  }

  loadMockPropertyTypes(): void {
    console.log('Loading mock property types...');
    this.propertyTypes = [
      { id: 1, name: 'Apartment' },
      { id: 2, name: 'Villa' },
      { id: 3, name: 'Studio' },
      { id: 4, name: 'Penthouse' }
    ];
  }

  loadMockServices(): void {
    console.log('Loading mock services...');
    this.services = [
      { id: 1, name: 'WiFi', icon: 'fas fa-wifi' },
      { id: 2, name: 'Parking', icon: 'fas fa-parking' },
      { id: 3, name: 'Pool', icon: 'fas fa-swimming-pool' },
      { id: 4, name: 'Gym', icon: 'fas fa-dumbbell' },
      { id: 5, name: 'Air Conditioning', icon: 'fas fa-snowflake' },
      { id: 6, name: 'Kitchen', icon: 'fas fa-utensils' }
    ];
  }

  onCountryChange(): void {
    const selected = this.locations.find(l => l.country === this.country);
    this.cities = selected ? selected.cities.map(c => c.city) : [];
    this.city = '';
    this.district = '';
    this.districts = [];
  }

  onCityChange(): void {
    const selectedCountry = this.locations.find(l => l.country === this.country);
    const selectedCity = selectedCountry?.cities.find(c => c.city === this.city);
    this.districts = selectedCity?.districts || [];
  }

  togglePropertyType(propertyTypeId: number): void {
    const index = this.selectedPropertyTypeIds.indexOf(propertyTypeId);
    if (index > -1) {
      this.selectedPropertyTypeIds.splice(index, 1);
    } else {
      this.selectedPropertyTypeIds.push(propertyTypeId);
    }
  }

  toggleService(serviceId: number): void {
    const index = this.selectedServiceIds.indexOf(serviceId);
    if (index > -1) {
      this.selectedServiceIds.splice(index, 1);
    } else {
      this.selectedServiceIds.push(serviceId);
    }
  }

  isPropertyTypeSelected(propertyTypeId: number): boolean {
    return this.selectedPropertyTypeIds.includes(propertyTypeId);
  }

  isServiceSelected(serviceId: number): boolean {
    return this.selectedServiceIds.includes(serviceId);
  }

  applyFilter(): void {
    console.log('Applying filter...');
    const filter: PropertyFilterRequest = {
      search: this.search || undefined,
      propertyTypeIds: this.selectedPropertyTypeIds.length > 0 ? this.selectedPropertyTypeIds : undefined,
      serviceIds: this.selectedServiceIds.length > 0 ? this.selectedServiceIds : undefined,
      country: this.country || undefined,
      city: this.city || undefined,
      district: this.district || undefined,
      minRoomCount: this.minRoomCount || undefined,
      maxPrice: this.maxPrice || undefined,
      minPeople: this.minPeople || undefined
    };

    console.log('Emitting filter:', filter);
    this.filterApplied.emit(filter);
  }

  clearFilters(): void {
    console.log('Clearing filters...');
    this.search = '';
    this.selectedPropertyTypeIds = [];
    this.selectedServiceIds = [];
    this.country = '';
    this.city = '';
    this.district = '';
    this.minRoomCount = null;
    this.maxPrice = null;
    this.minPeople = null;
    this.cities = [];
    this.districts = [];
    this.applyFilter();
  }
}
