import { HomeTopRatedPropertyService } from '../../../core/services/home-topRatedProperty.service';
import { IPropertyCard } from './../../../core/interfaces/recomendedProperty';
import { CarouselGrid } from './../../../shared/carousel-grid/carousel-grid';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
@Component({
  selector: 'app-featured-properties',
  imports: [CarouselGrid,ProgressSpinner],
  templateUrl: './featured-properties.html',
  styleUrl: './featured-properties.css'
})
export class FeaturedProperties implements OnInit {
  Properties: IPropertyCard[] = [];

  constructor(private homeTopRatedPropertyService: HomeTopRatedPropertyService) {}

  ngOnInit(): void {
    this.homeTopRatedPropertyService.getTopRatedProperties().subscribe({
      next: (data) => {
        this.Properties = data;
      },
      error: (err) => {
        console.error('Failed to load properties:', err);
      }
    });
  }
}
