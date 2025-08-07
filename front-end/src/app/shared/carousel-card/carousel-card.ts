import { IPropertyCard } from '../../core/interfaces/recomendedProperty';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prop-card-cer',
  imports: [CarouselModule, ButtonModule, CommonModule, RatingModule, FormsModule, Rating],
  templateUrl: './carousel-card.html',
  styleUrl: './carousel-card.css'
})
export class PropCardCer {
  @Input() Property!: IPropertyCard;
  
  constructor(private router: Router) {}

  toggleFavorite(property: IPropertyCard, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    property.isFavorite = !property.isFavorite;
  }

  goToPropertyDetails(): void {
    this.router.navigate(['/properties', this.Property.id]);
  }
}
