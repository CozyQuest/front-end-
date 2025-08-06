import { Component, Input } from '@angular/core';
import { OwnedPropertiesService } from '../../../core/services/owned-properties.service';
import { OwnedProperty } from '../../../core/interfaces/ownedProperty.model';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-owned-properties',
  imports: [RouterModule,CarouselModule,CardModule,CommonModule],
  templateUrl: './public-owned-properties.html',
  styleUrl: './public-owned-properties.css'
})
export class PublicOwnedProperties {
  @Input() userId: string = '';

 myProperties: OwnedProperty[] = [];

  carouselResponsiveOptions = [
    { breakpoint: '412px', numVisible: 1, numScroll: 1 },
    { breakpoint: '576px', numVisible: 1, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '992px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1200px', numVisible: 4, numScroll: 1 },
  ];

  constructor(private propertyService: OwnedPropertiesService) {}
  ngOnInit(): void {
    if (this.userId) {
      this.propertyService.getOwnedProperties(this.userId).subscribe({
        next: (properties) => {
          this.myProperties = properties;
        },
        error: (err) => {
          console.error('Failed to fetch properties:', err);
        }
      });
    }
  }
}
