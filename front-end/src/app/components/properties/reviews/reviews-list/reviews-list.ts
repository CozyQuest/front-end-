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

  reviews: ViewReview[] = [];
  userLocation: string = "Alexandria, Egypt";

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
      }
    });
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
