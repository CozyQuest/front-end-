import { Component, inject, Input} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { OwnedPropertiesService } from '../../../core/services/owned-properties.service';
import { OwnedProperty } from '../../../core/interfaces/ownedProperty.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owned-properties',
  standalone: true,
  imports: [CarouselModule,CommonModule,RouterModule,RouterLink,CardModule],
  templateUrl: './owned-properties.html',
  styleUrl: './owned-properties.css'
})

export class OwnedProperties  {
  @Input() userId: string = '';
   private router = inject(Router)

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

  goToPropertyDetails(propertyId: number) {
    this.router.navigate(['/properties', propertyId]);
  }
} 