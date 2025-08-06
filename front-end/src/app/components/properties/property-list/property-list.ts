import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from "./filter-card/filter-card";
import { PropertyCard } from "./property-card/property-card";
import { CommonModule } from '@angular/common';
import { PropertyListService } from '../../../core/services/PropertyListService/PropertyList';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FilterComponent, PropertyCard, CommonModule],
  templateUrl: './property-list.html'
})
export class PropertyList implements OnInit {
  heroBackgroundImage = 'url(assets/images/bg/01.jpg)';
  properties: any[] = [];

  // Pagination
  pageSize = 3; // apartments per page
  currentPage = 1;
  totalPages = 1;

  constructor(
    private propertyListService: PropertyListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check for query parameters from hero search
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        // Apply filter from hero search
        this.applyFilterFromParams(params);
      } else {
        // Load all properties if no filter parameters
        this.loadProperties();
      }
    });
  }

  applyFilterFromParams(params: any) {
    console.log('Applying filter from hero search params:', params);
    
    // Prepare filter parameters for API
    const apiFilterParams = {
      propertyTypeIds: params.typeId ? [params.typeId] : [],
      serviceIds: params.serviceId ? [params.serviceId] : [],
      country: params.country || '',
      city: params.city || '',
      district: params.district || '',
      search: params.search || '',
      minPeople: params.minPeople || 0,
      minSpace: params.minSpace || 0,
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 0,
      orderBy: params.orderBy || ''
    };

    console.log('Sending filter request with params:', apiFilterParams);

    this.propertyListService.filterProperties(apiFilterParams).subscribe(filteredProperties => {
      console.log('Filtered properties received:', filteredProperties);
      
      // Debug image data
      filteredProperties.forEach((property, index) => {
        console.log(`Property ${index + 1} image data:`, {
          title: property.title,
          mainImageUrl: property.mainImageUrl,
          images: property.images,
          imageUrls: property.imageUrls
        });
      });
      
      this.properties = filteredProperties;
      this.totalPages = Math.ceil(this.properties.length / this.pageSize);
      this.currentPage = 1; // Reset to first page when filtering
    });
  }

  loadProperties() {
    this.propertyListService.getAllProperties().subscribe(properties => {
      this.properties = properties;
      this.totalPages = Math.ceil(this.properties.length / this.pageSize);
      this.currentPage = 1; // Reset to first page when loading new data
    });
  }

  onFilterApplied(filterParams: any) {
    console.log('Filter applied with params:', filterParams);
    
    // Prepare filter parameters for API
    const apiFilterParams = {
      propertyTypeIds: filterParams.typeId ? [filterParams.typeId] : [],
      serviceIds: filterParams.serviceId ? [filterParams.serviceId] : [],
      country: filterParams.country || '',
      city: filterParams.city || '',
      district: filterParams.district || '',
      search: filterParams.search || '',
      minPeople: filterParams.minPeople || 0,
      minSpace: filterParams.minSpace || 0,
      minPrice: filterParams.minPrice || 0,
      maxPrice: filterParams.maxPrice || 0,
      orderBy: filterParams.orderBy || ''
    };

    console.log('Sending filter request with params:', apiFilterParams);

    this.propertyListService.filterProperties(apiFilterParams).subscribe(filteredProperties => {
      console.log('Filtered properties received:', filteredProperties);
      
      // Debug image data
      filteredProperties.forEach((property, index) => {
        console.log(`Property ${index + 1} image data:`, {
          title: property.title,
          mainImageUrl: property.mainImageUrl,
          images: property.images,
          imageUrls: property.imageUrls
        });
      });
      
      this.properties = filteredProperties;
      this.totalPages = Math.ceil(this.properties.length / this.pageSize);
      this.currentPage = 1; // Reset to first page when filtering
    });
  }

  get pagedApartments(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.properties.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
