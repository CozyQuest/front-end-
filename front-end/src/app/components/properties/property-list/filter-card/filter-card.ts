import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PropertyService } from '../../../../core/services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter-card.html',
  imports:[CommonModule,FormsModule]
})
export class FilterComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<any>();

  locations: any[] = [];
  cities: string[] = [];
  districts: string[] = [];

  search: any;
  propertyTypeId: any;
  country: any;
  city: any;
  district: any;
  minRoomCount: any;
  maxPrice: any;
  minPeople: any;

 

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getLocations().subscribe((res) => {
      this.locations = res;
    });
  }

onCountryChange() {
  const selected = this.locations.find((l: any) => l.country === this.country);
  this.cities = selected ? selected.cities.map((c: any) => c.city) : [];
  this.city = null;
  this.district = null;
  this.districts = [];
}

onCityChange() {
  const selectedCountry = this.locations.find((l: any) => l.country === this.country);
  const selectedCity = selectedCountry?.cities.find((c: any) => c.city === this.city);
  this.districts = selectedCity?.districts || [];
}


  applyFilter() {
    this.filterApplied.emit({
      search: this.search,
      propertyTypeId: this.propertyTypeId,
      country: this.country,
      city: this.city,
      district: this.district,
      minRoomCount: this.minRoomCount,
      maxPrice: this.maxPrice,
      minPeople: this.minPeople,
    });
  }
}
