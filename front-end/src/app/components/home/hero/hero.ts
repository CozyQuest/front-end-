import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Card } from '../../../shared/card/card';
import { PropertyListService } from '../../../core/services/PropertyListService/PropertyList';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Card, CommonModule, FormsModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit {
  @Output() filterApplied = new EventEmitter<any>();

  propertyTypes: any[] = [];
  services: any[] = [];
  locations: any[] = [];
  cities: any[] = [];
  districts: any[] = [];

  selectedTypeId: number | null = null;
  selectedServiceId: number | null = null;
  selectedCountry: string = '';
  selectedCity: string = '';
  selectedDistrict: string = '';
  search: string = '';
  country: string = '';
  city: string = '';
  district: string = '';
  minPeople: number | null = null;
  minSpace: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  orderBy: string = '';

  private searchTimeout: any;

  constructor(
    private propertyListService: PropertyListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.propertyListService.getPropertyTypes().subscribe(types => {
      this.propertyTypes = types;
    });
    this.propertyListService.getServices().subscribe(services => {
      this.services = services;
    });
    this.propertyListService.getLocations().subscribe(locations => {
      console.log('Locations loaded:', locations);
      this.locations = locations;
    });
  }

  onCountryChange() {
    console.log('onCountryChange called with selectedCountry:', this.selectedCountry);
    console.log('locations:', this.locations);
    
    if (!this.locations || this.locations.length === 0) {
      console.log('Locations not loaded yet');
      return;
    }
    
    const selectedLocation = this.locations.find(loc => loc.country === this.selectedCountry);
    console.log('selectedLocation:', selectedLocation);
    
    if (selectedLocation) {
      this.cities = selectedLocation.cities;
      console.log('cities set to:', this.cities);
      this.selectedCity = '';
      this.selectedDistrict = '';
      this.districts = [];
    } else {
      this.cities = [];
      this.selectedCity = '';
      this.selectedDistrict = '';
      this.districts = [];
    }
  }

  onCityChange() {
    const selectedLocation = this.locations.find(loc => loc.country === this.selectedCountry);
    if (selectedLocation) {
      const selectedCityData = selectedLocation.cities.find((c: any) => c.city === this.selectedCity);
      if (selectedCityData) {
        this.districts = selectedCityData.districts;
        this.selectedDistrict = '';
      }
    }
  }

  onSearchChange() {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    // Set new timeout to wait for user to stop typing
    this.searchTimeout = setTimeout(() => {
      this.emitFilter();
    }, 500); // Wait 500ms after user stops typing
  }

  private emitFilter() {
    this.filterApplied.emit({
      typeId: this.selectedTypeId,
      serviceId: this.selectedServiceId,
      country: this.selectedCountry,
      city: this.selectedCity,
      district: this.selectedDistrict,
      search: this.search,
      minPeople: this.minPeople,
      minSpace: this.minSpace,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      orderBy: this.orderBy
    });
  }

  applyFilter() {
    // Clear any pending search timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    // Check if router is available
    if (!this.router) {
      console.error('Router is not available');
      return;
    }
    
    // Prepare filter parameters for navigation
    const filterParams = {
      typeId: this.selectedTypeId,
      serviceId: this.selectedServiceId,
      country: this.selectedCountry,
      city: this.selectedCity,
      district: this.selectedDistrict,
      search: this.search,
      minPeople: this.minPeople,
      minSpace: this.minSpace,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      orderBy: this.orderBy
    };

    // Remove null/undefined values
    const cleanParams: any = {};
    Object.keys(filterParams).forEach(key => {
      const value = (filterParams as any)[key];
      if (value !== null && value !== undefined && value !== '') {
        cleanParams[key] = value;
      }
    });

    console.log('Navigating to properties with params:', cleanParams);

    try {
      // Navigate to property list with filter parameters
      this.router.navigate(['/rent'], { queryParams: cleanParams });
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: try to navigate without parameters
      this.router.navigate(['/rent']);
    }
  }
}