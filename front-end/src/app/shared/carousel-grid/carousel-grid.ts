import { IPropertyCard } from './../../core/interfaces/recomendedProperty';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { PropCardCer } from "../carousel-card/carousel-card";

@Component({
  selector: 'app-carousel-grid',
  imports: [CarouselModule, ButtonModule, CommonModule, RatingModule, FormsModule, PropCardCer],
  templateUrl: './carousel-grid.html',
  styleUrl: './carousel-grid.css'
})
export class CarouselGrid implements OnInit {
  responsiveOptions: any[] | undefined;
  @Input() Properties!: IPropertyCard[];
  ngOnInit() {
    if (!this.Properties || this.Properties.length === 0) {
      this.Properties = [
        {
          id: '1',
          name: 'Modern Apartment in Downtown',
          image: 'https://placehold.co/400x300?text=Apartment+1',
          rentPerDay: 120,
          rating: 4.5,
          reviewsCount: 87,
          isFavorite: false,
          area: 90,
          bathrooms: 1,
          bedrooms: 2,
          location: 'Cairo, Egypt',
        },
        {
          id: '2',
          name: 'Cozy Studio Near Metro',
          image: 'https://placehold.co/400x300?text=Studio',
          rentPerDay: 75,
          rating: 4.2,
          reviewsCount: 45,
          isFavorite: true,
          area: 40,
          bathrooms: 1,
          bedrooms: 1,
          location: 'Giza, Egypt',
        },
        {
          id: '3',
          name: 'Luxury Villa with Private Pool',
          image: 'https://placehold.co/400x300?text=Villa',
          rentPerDay: 350,
          rating: 4.9,
          reviewsCount: 125,
          isFavorite: false,
          area: 300,
          bathrooms: 3,
          bedrooms: 4,
          location: 'Sharm El-Sheikh, Egypt',
        },
        {
          id: '4',
          name: 'Beachside Bungalow',
          image: 'https://placehold.co/400x300?text=Bungalow',
          rentPerDay: 200,
          rating: 4.7,
          reviewsCount: 98,
          isFavorite: true,
          area: 110,
          bathrooms: 2,
          bedrooms: 2,
          location: 'Hurghada, Egypt',
        },
        {
          id: '5',
          name: 'Penthouse with City View',
          image: 'https://placehold.co/400x300?text=Penthouse',
          rentPerDay: 180,
          rating: 4.6,
          reviewsCount: 64,
          isFavorite: false,
          area: 150,
          bathrooms: 2,
          bedrooms: 3,
          location: 'Alexandria, Egypt',
        }
      ];
    }
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
