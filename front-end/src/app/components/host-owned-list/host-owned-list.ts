import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyCard } from "../properties/property-list/property-card/property-card";
import { Apartment } from '../../core/interfaces/apartment.model';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { OwnedPropertyService } from '../../core/services/owned-property.service';
// import { ApartmentService } from '../../core/services/apartment.service';

@Component({
  selector: 'app-host-owned-list',
  imports: [PropertyCard, PaginatorModule],
  templateUrl: './host-owned-list.html',
  styleUrl: './host-owned-list.css'
})
export class HostOwnedList implements OnInit{

  constructor(
    private router: Router,
    private ownedPropertyService: OwnedPropertyService
  ) {}

  ngOnInit(): void {
    this.loadOwnedProperties();
  }

  loadOwnedProperties(): void {
    this.isLoading = true;
    this.ownedPropertyService.getOwnedProperties(this.currentPage, this.rows)
      .subscribe({
        next: (properties) => {
          this.properties = properties;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading owned properties:', error);
          this.isLoading = false;
          // Keep mock data as fallback for development
          this.loadMockData();
        }
      });
  }

  private loadMockData(): void {
    this.properties = [
      {
        id: 1,
        title: 'Modern Studio in Zamalek',
        price: 7500,
        location: 'Zamalek, Cairo',
        area: 45,
        beds: 1,
        baths: 1,
        imageUrl: 'https://shreethemes.in/hously/landing/assets/images/property/1.jpg',
        rating: 4.2,
        reviewCount: 23
      },
      {
        id: 2,
        title: 'Luxury Apartment in New Cairo',
        price: 15000,
        location: 'New Cairo',
        area: 120,
        beds: 3,
        baths: 2,
        imageUrl: 'https://shreethemes.in/hously/landing/assets/images/property/2.jpg',
        rating: 4.7,
        reviewCount: 58
      },
      {
        id: 3,
        title: 'Cozy Flat in Alexandria',
        price: 5500,
        location: 'Smouha, Alexandria',
        area: 70,
        beds: 2,
        baths: 1,
        imageUrl: 'https://shreethemes.in/hously/landing/assets/images/property/3.jpg',
        rating: 3.9,
        reviewCount: 12
      }
    ];
  }
  properties: Apartment[] = [];
  first: number = 0;
  rows: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.currentPage = Math.floor(this.first / this.rows) + 1;
    this.loadOwnedProperties();
  }

  navigateToAddProperty() {
    this.router.navigate(['/property/add']);
  }
  // constructor(private apartmentService: ApartmentService) {
  //   this.apartmentService.getApartments().subscribe((apartments) => {
  //     this.apartments = apartments;
  //   });
  // }
}
