import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Property } from '../../../../core/interfaces/Property';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.html'
})
export class PropertyCard {
  @Input()
  property!: Property;

  constructor(private router: Router) {}

  NavigateToProp(id: number) {
    this.router.navigate(['/properties', id]);
  }

  toggleFavorite() {
    // Handle favorite toggle logic here
  }
}
