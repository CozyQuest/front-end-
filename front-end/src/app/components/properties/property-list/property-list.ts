import { Component } from '@angular/core';
import { FilterComponent } from "./filter-card/filter-card";
import { PropertyCard } from "./property-card/property-card";
import { Apartment } from '../../../core/interfaces/apartment.model';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [FilterComponent, PropertyCard],
  templateUrl: './property-list.html'
})
export class PropertyList {
  apartments: Apartment[] = [
    {
      id: 1,
      title: 'Modern Studio in Zamalek',
      price: 7500,
      location: 'Zamalek, Cairo',
      area: 45,
      beds: 1,
      baths: 1,
      imageUrl: 'https://via.placeholder.com/300x200?text=Zamalek+Studio',
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
      imageUrl: 'https://via.placeholder.com/300x200?text=New+Cairo+Luxury',
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
      imageUrl: 'https://via.placeholder.com/300x200?text=Alex+Flat',
      rating: 3.9,
      reviewCount: 12
    }
  ];

}
