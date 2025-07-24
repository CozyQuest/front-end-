import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Apartment } from '../../../../core/interfaces/apartment.model';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.html'
})
export class PropertyCard {
  @Input()
  apartment!: Apartment;

  toggleFavorite() {
    // Handle favorite toggle logic here
  }
}
