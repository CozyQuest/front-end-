import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../core/services/propertyDetails.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReviewService } from '../../../core/services/review.service';
import { properties } from '../../../core/interfaces/propertyDetails';
import { Review } from '../../../core/interfaces/Review';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReviewsList } from '../reviews/reviews-list/reviews-list';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-details',
  imports: [CommonModule, DatePickerModule, CarouselModule, FormsModule, ButtonModule, ReviewsList],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails implements OnInit {
  property?: properties;
  mapUrl?: SafeResourceUrl;
  averageRating: number = 4.2; // Example value until reviews are hooked up
  ratingCount: number = 12; // Example value until reviews are hooked up
  reviews: any[] = []; // Placeholder

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.propertyService.getPropertyById(id).subscribe({
        next: (data) => {
          this.property = data;
          const rawUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR-API-KEY&center=${data.latitude},${data.longitude}&zoom=14`;
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
        },
        error: (err) => console.error(err)
      });
    }
  }

  getServiceIcon(icon: string) {
    return icon; // Backend sends "fa-solid fa-snowflake" etc.
  }

  getFilledStars() {
    return Array(Math.floor(this.averageRating)).fill(0);
  }

  getEmptyStars() {
    return Array(5 - Math.floor(this.averageRating)).fill(0);
  }

  getRatingText() {
    if (this.averageRating >= 4.5) return 'Excellent stay!';
    if (this.averageRating >= 3.5) return 'Very good experience.';
    return 'Decent but could improve.';
  }

  reserveProperty() {
    console.log('Reserve clicked');
  }
}
