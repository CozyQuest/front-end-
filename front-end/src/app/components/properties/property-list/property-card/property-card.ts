import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Property } from '../../../../core/interfaces/property.model';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.html'
})
export class PropertyCard {
  @Input()
  property!: Property;

  toggleFavorite() {
    // Handle favorite toggle logic here
  }
}
