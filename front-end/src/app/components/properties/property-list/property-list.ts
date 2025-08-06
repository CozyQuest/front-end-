import { Component, OnInit } from '@angular/core';
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

  constructor(private propertyListService: PropertyListService) {}

  ngOnInit() {
    this.loadProperties();
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
      search: filterParams.search || '', // Add search parameter
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
