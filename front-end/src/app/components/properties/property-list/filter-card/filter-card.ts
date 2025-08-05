import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PropertyListService } from '../../../../core/services/property-list.service/property-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  @Output() filterApplied = new EventEmitter<any>();

  locations: Location[] = [];
  cities: string[] = [];
  districts: string[] = [];

  country: string = '';
  city: string = '';
  district: string = '';

  search: string = '';
  propertyTypeId: number | null = null;
  minRoomCount: number | null = null;
  maxPrice: number | null = null;
  minPeople: number | null = null;

  constructor(private propertyListService: PropertyListService) {}

  ngOnInit(): void {
    this.propertyListService.getLocations().subscribe((res: Location[]) => {
      this.locations = res;
    });
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

  applyFilter(): void {
    this.filterApplied.emit({
      search: this.search,
      propertyTypeId: this.propertyTypeId,
      country: this.country,
      city: this.city,
      district: this.district,
      minRoomCount: this.minRoomCount,
      maxPrice: this.maxPrice,
      minPeople: this.minPeople
    });
  }
}
