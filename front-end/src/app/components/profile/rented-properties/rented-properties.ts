import { Component } from '@angular/core';
import { RentedProperty } from '../../../core/interfaces/RentedProperty';
import { RentedPropertyService } from '../../../core/services/RentedProperty.service';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-rented-properties',
  imports: [CarouselModule],
  templateUrl: './rented-properties.html',
  styleUrl: './rented-properties.css'
})
export class RentedProperties {
rentedProperties: RentedProperty[] = [];
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
  

  constructor(private rentedService: RentedPropertyService) {}

  ngOnInit(): void {
    this.rentedProperties = this.rentedService.getRentedPropertiesByUserId(this.userId);
  }
}
