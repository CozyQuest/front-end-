import { Component, inject, Input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsDialog } from '../reviews-dialog/reviews-dialog';
import { CommonModule } from '@angular/common';
import { ViewReviewService } from '../../../../core/services/view-reviews.service';
import { ViewReview } from '../../../../core/interfaces/ViewReviews';
import { AddReview } from '../add-review/add-review';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-reviews-list',
  imports: [CommonModule,AddReview,RouterModule],
  templateUrl: './reviews-list.html',
  styleUrl: './reviews-list.css'
})
export class ReviewsList {
@Input() propertyId!: number;

private sampleLocations: string[] = [
  'New York, USA',
  'Los Angeles, USA',
  'Toronto, Canada',
  'Vancouver, Canada',
  'London, UK',
  'Manchester, UK',
  'Paris, France',
  'Berlin, Germany',
  'Madrid, Spain',
  'Rome, Italy',
  'Lisbon, Portugal',
  'Amsterdam, Netherlands',
  'Zurich, Switzerland',
  'Vienna, Austria',
  'Oslo, Norway',
  'Stockholm, Sweden',
  'Copenhagen, Denmark',
  'Helsinki, Finland',
  'Dublin, Ireland',
  'Warsaw, Poland',
  'Prague, Czech Republic',
  'Budapest, Hungary',
  'Athens, Greece',
  'Istanbul, Turkey',
  'Cairo, Egypt',
  'Alexandria, Egypt',
  'Nairobi, Kenya',
  'Lagos, Nigeria',
  'Cape Town, South Africa',
  'Dubai, UAE',
  'Doha, Qatar',
  'Riyadh, Saudi Arabia',
  'Amman, Jordan',
  'Beirut, Lebanon',
  'Mumbai, India',
  'Delhi, India',
  'Bangalore, India',
  'Karachi, Pakistan',
  'Lahore, Pakistan',
  'Dhaka, Bangladesh',
  'Jakarta, Indonesia',
  'Kuala Lumpur, Malaysia',
  'Singapore, Singapore',
  'Bangkok, Thailand',
  'Seoul, South Korea',
  'Tokyo, Japan',
  'Beijing, China',
  'Shanghai, China',
  'Sydney, Australia',
  'Melbourne, Australia'
];

  reviews: ViewReview[] = [];
  reviewLocations: string[] = [];

  showAddReviewModal = signal(false);
  showLoginMessage = signal(false);
  private router = inject(Router)

  isLoggedIn: boolean;
   defaultAvatar : string = "https://i.pinimg.com/736x/82/85/96/828596ef925a10e8c1a76d3a3be1d3e5.jpg";

  constructor(
    private reviewService: ViewReviewService,
    private dialog: MatDialog,
    private authService: AuthService,
   
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    if (this.propertyId !== undefined) {
      this.fetchReviews(this.propertyId);
    } else {
      console.warn('No propertyId provided to ReviewsListComponent');
    }

    // Listen for custom event dispatched from AddReview component
    window.addEventListener('submitted', () => {
      this.onReviewSubmitted();
    });
  }

  private fetchReviews(propertyId: number): void {
    this.reviewService.getReviewsForProperty(propertyId).subscribe({
      next: (data) => {
        this.reviews = data.map(r => ({
          userId : r.userId,
          reviewText: r.reviewText,
          rate: r.rate,
          createdAt: r.createdAt,
          userFullName: r.userFullName,
          userProfilePicUrl: r.userProfilePicUrl
        }));
        this.reviewLocations = data.map(() => this.getRandomLocation());
      }
    });
  }

  private getRandomLocation(): string {
  const index = Math.floor(Math.random() * this.sampleLocations.length);
  return this.sampleLocations[index];
}

  openDialog(): void {
    this.dialog.open(ReviewsDialog, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: { reviews: this.reviews }
    });
  }

  openReviewModal() {
    if (!this.isLoggedIn) {
      this.showLoginMessage.set(true);
      setTimeout(() => this.showLoginMessage.set(false), 3000);
      return;
    }

    this.showAddReviewModal.set(true);
  }

  closeModal() {
    this.showAddReviewModal.set(false);
  }

  onReviewSubmitted() {
    this.closeModal();
    this.fetchReviews(this.propertyId);
  }

  goToPublicProfile(userId: string) {
    this.router.navigate(['/public', userId]);
  }

}
