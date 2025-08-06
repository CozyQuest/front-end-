import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../core/services/propertyDetails.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { properties } from '../../../core/interfaces/propertyDetails';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReviewsList } from '../reviews/reviews-list/reviews-list';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-property-details',
  imports: [CommonModule, DatePickerModule,CarouselModule, FormsModule, ButtonModule,ReviewsList,RouterModule],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails implements OnInit {
getRatingText() {
throw new Error('Method not implemented.');
}
  property?: properties;
  mapUrl?: SafeResourceUrl;
  loadingImages = true;
  averageRating: number = 0;
  ratingCount: number = 0;

  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.propertyService.getPropertyById(id).subscribe({
        next: (data) => {
          this.property = data;
          const rawUrl = `https://www.google.com/maps/embed/v1/view?key=ADD-API-KEY&center=${data.latitude},${data.longitude}&zoom=14`;
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

  reserveProperty() {
    console.log('Reserve clicked');
  }
}
