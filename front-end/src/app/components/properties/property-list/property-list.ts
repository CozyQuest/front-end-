import { Component, OnInit } from '@angular/core';
import { FilterComponent } from "./filter-card/filter-card";
import { PropertyCard } from "./property-card/property-card";
import { CommonModule } from '@angular/common';
import { PropertyListService } from '../../../core/services/property-list.service/property-list.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FilterComponent, PropertyCard, CommonModule],
  templateUrl: './property-list.html'
})
export class PropertyList implements OnInit {

  heroBackgroundImage = 'url(assets/images/bg/01.jpg)';
  properties: any[] = [];

  // Pagination State
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;

  // Filters
  currentFilters: any = {};

  constructor(private propertyListService: PropertyListService) {}

  ngOnInit() {
    this.getFiltered();
  }

  getFiltered(page: number = 1, filters: any = this.currentFilters) {
    this.currentPage = page;
    this.currentFilters = filters;

    const requestPayload = {
      ...filters,
      PageNumber: this.currentPage,
      PageSize: this.pageSize,
      PropertyTypeIds: filters.propertyTypeId ? [filters.propertyTypeId] : undefined,
    };

    this.propertyListService.getFilteredProperties(requestPayload).subscribe(response => {
      this.properties = response.items;
      const totalCount = response.totalCount || 0;
      this.totalPages = Math.ceil(totalCount / this.pageSize);
    });
  }

 onFilterApplied(filter: any) {
  this.getFiltered(1, filter); // Reset to page 1 with new filters
}



  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getFiltered(page);
    }
  }
}
