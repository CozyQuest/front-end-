import { Component, Input, SimpleChanges } from '@angular/core';
import { RentedProperty } from '../../../core/interfaces/RentedProperty';
import { CarouselModule } from 'primeng/carousel';
import { RentedPropertiesService } from '../../../core/services/rented-properties.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-rented-properties',
  imports: [CarouselModule,CommonModule,RouterModule],
  templateUrl: './rented-properties.html',
  styleUrl: './rented-properties.css'
})
export class RentedProperties {
@Input() userId!: string;
  rentedProperties: RentedProperty[] = [];
  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private propertyService: RentedPropertiesService ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.loadRentedProperties(this.userId);
    }
  }

  loadRentedProperties(userId: string) {
    this.propertyService.getRentedPropertiesByUser(userId).subscribe({
      next: (response) => {
        this.rentedProperties = response;
        console.log('Rented properties loaded:', response);
      },
      error: (err) => {
        console.error('Error fetching rented properties:', err);
      }
    });
  }
}