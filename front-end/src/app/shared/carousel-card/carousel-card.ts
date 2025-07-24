import { RecomendedProperty } from '../../core/interfaces/recomendedProperty';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
@Component({
  selector: 'app-prop-card-cer',
  imports: [CarouselModule, ButtonModule, CommonModule, RatingModule, FormsModule, Rating],
  templateUrl: './carousel-card.html',
  styleUrl: './carousel-card.css'
})
export class PropCardCer {
  @Input() Property!: RecomendedProperty;
    toggleFavorite(product: RecomendedProperty) {
    product.isFavorite = !product.isFavorite;
  }
}
