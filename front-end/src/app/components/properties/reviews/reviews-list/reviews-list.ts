import { Component, Input, signal } from '@angular/core';
import { Review } from '../../../../core/interfaces/Review';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsDialog } from '../reviews-dialog/reviews-dialog';
import { CommonModule } from '@angular/common';
import { AddReview } from '../add-review/add-review';
import { ViewReviewService } from '../../../../core/services/view-reviews.service';
import { ViewReview } from '../../../../core/interfaces/ViewReviews';

@Component({
  selector: 'app-reviews-list',
  imports: [CommonModule,AddReview],
  templateUrl: './reviews-list.html',
  styleUrl: './reviews-list.css'
})
export class ReviewsList {
@Input() propertyId?: number; 

  reviews: ViewReview[] = [];
  userLocation: string = "Alexandria, Egypt";

  constructor(private reviewService: ViewReviewService,private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.propertyId !== undefined) {
      this.fetchReviews(this.propertyId);
    } else {
      console.warn('No propertyId provided to ReviewsListComponent');
    }
  }

  private fetchReviews(propertyId: number): void {
    this.reviewService.getReviewsForProperty(propertyId).subscribe({
      next: (data) => {
        this.reviews = data.map(r => ({
          reviewText: r.reviewText,
          rate: r.rate,
          createdAt: r.createdAt,
          userFullName : r.userFullName,
          userProfilePicUrl : r.userProfilePicUrl
        }));
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      },
    });
  }

openDialog(): void {
  this.dialog.open(ReviewsDialog, {
    width: '800px',
    panelClass: 'custom-dialog-container',
    data: { reviews: this.reviews }
  });
}

showAddReviewModal = signal(false);

  openModal() {
    this.showAddReviewModal.set(true);
  }

  closeModal() {
    this.showAddReviewModal.set(false);
  }

  handleReviewSubmitted(review: any) {
    console.log('Review submitted:', review);
    this.closeModal();
  }
}
