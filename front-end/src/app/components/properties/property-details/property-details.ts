import { Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReviewService } from '../../../core/services/review.service';
import { Property } from '../../../core/interfaces/Property';
import { Review } from '../../../core/interfaces/Review';
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
export class PropertyDetails {
  route = inject(ActivatedRoute);
  router = inject(Router);
  propertyService = inject(PropertyService);
  sanitizer = inject(DomSanitizer);
  reviewService = inject(ReviewService);

  property?: Property;
  reviews: Review[] = [];
  mapUrl?: SafeResourceUrl;
  loadingImages = true;
  averageRating: number = 0;
  ratingCount: number = 0;

  getRatingText(): string {
    if (this.averageRating >= 4.5) {
      return 'Outstanding stay! Guests loved it.';
    } else if (this.averageRating >= 4.0) {
      return 'Great experience. Highly recommended.';
    } else if (this.averageRating >= 3.0) {
      return 'Decent property. Some room for improvement.';
    } else if (this.averageRating >= 2.0) {
      return 'Below average. Consider checking reviews.';
    } else if (this.averageRating > 0) {
      return 'Poor experience. Not recommended.';
    }
    return 'No ratings yet.';
  }

 reserveProperty() {
    if (this.property?.id) {
      this.router.navigate(['/checkout', this.property.id], {
      });
    }
  }

  getServiceIcon(serviceName: string): string {
    const iconMap: { [key: string]: string } = {
      'Wi-Fi': 'pi pi-wifi',
      'WiFi': 'pi pi-wifi',
      'TV': 'pi pi-video',
      'Kitchen': 'pi pi-home',
      'Air Conditioning': 'pi pi-sun',
      'Heating': 'pi pi-fire',
      'Washer': 'pi pi-refresh',
      'Parking': 'pi pi-car',
      'Pool': 'pi pi-globe',
      'Gym': 'pi pi-bolt',
      'Elevator': 'pi pi-arrow-up',
      'Workspace': 'pi pi-briefcase',
      'Default': 'pi pi-check-circle'
    };

    return iconMap[serviceName] || iconMap['Default'];
  }

  getFilledStars(): number[] {
    return Array(Math.floor(this.averageRating)).fill(0);
  }

  getEmptyStars(): number[] {
    return Array(5 - Math.floor(this.averageRating)).fill(0);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertyService.getPropertyById(id).subscribe((res: Property) => {
    this.property = res;

      const location = `${res.latitude},${res.longitude}`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://maps.google.com/maps?q=${location}&output=embed`
      );

      this.reviews = this.reviewService.getReviewsByPropertyId(id);

      if (this.property?.ratings?.length) {
        const rated = this.property.ratings.filter(r => r.rating > 0);
        this.ratingCount = rated.length;
        if (this.ratingCount > 0) {
          const total = rated.reduce((sum, r) => sum + r.rating, 0);
          this.averageRating = +(total / this.ratingCount).toFixed(1);
        }
      }
    });
  }
}
