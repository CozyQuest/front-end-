import { Component} from '@angular/core';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/interfaces/Property';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-owned-properties',
  standalone: true,
  imports: [CarouselModule,CommonModule,RouterModule,RouterLink,CardModule],
  templateUrl: './owned-properties.html',
  styleUrl: './owned-properties.css'
})
export class OwnedProperties {
  myProperties: Property[] = [];
  userId = 1;

  carouselResponsiveOptions = [
      {
        breakpoint: '412px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '576px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px', 
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '992px', 
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1200px', 
        numVisible: 4,
        numScroll: 1
      }
    ];
  
  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.myProperties = this.propertyService['properties'].filter(p => p.owner.id === this.userId);
  }

  getRatingAverage(ratings: { rating: number }[]): string {
    if (!ratings.length) return '0.0(0)';
    const avg = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;
    return `${avg.toFixed(1)}(${ratings.length})`;
  }


}
