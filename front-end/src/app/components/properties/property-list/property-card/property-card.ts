import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.html'
})
export class PropertyCard {
  @Input()
  property!: any; // Changed from Property interface to any to handle API response

  constructor(private router: Router) {}

  NavigateToProp(id: number) {
    this.router.navigate(['/properties', id]);
  }

  toggleFavorite() {
    // Handle favorite toggle logic here
  }
}
