import { Component } from '@angular/core';
import { FilterComponent } from "./filter-card/filter-card";
import { PropertyCard } from "./property-card/property-card";
import { Apartment } from '../../../core/interfaces/apartment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FilterComponent, PropertyCard, CommonModule],
  templateUrl: './property-list.html'
})
export class PropertyList {
  heroBackgroundImage = 'url(assets/images/bg/01.jpg)';
  apartments: Apartment[] = [
    {
      id: 1,
      title: 'Modern Studio in Zamalek',
      price: 7500,
      location: 'Zamalek, Cairo',
      area: 45,
      beds: 1,
      baths: 1,
      imageUrl: 'https://shreethemes.in/hously/landing/assets/images/property/1.jpg',
      rating: 4.2,
      reviewCount: 23
    },
    {
      id: 2,
      title: 'Luxury Apartment in New Cairo',
      price: 15000,
      location: 'New Cairo',
      area: 120,
      beds: 3,
      baths: 2,
      imageUrl: 'https://shreethemes.in/hously/landing/assets/images/property/2.jpg',
      rating: 4.7,
      reviewCount: 58
    },
    {
      id: 3,
      title: 'Cozy Flat in Alexandria',
      price: 5500,
      location: 'Smouha, Alexandria',
      area: 70,
      beds: 2,
      baths: 1,
      imageUrl: 'https://shreethemes.in/hously/landing/assets/images/property/3.jpg',
      rating: 3.9,
      reviewCount: 12
    }
  ];

}
