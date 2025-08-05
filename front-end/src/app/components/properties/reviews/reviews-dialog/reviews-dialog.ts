import { Component,inject,Inject } from '@angular/core';
import { Review } from '../../../../core/interfaces/Review';
import {  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ViewReview } from '../../../../core/interfaces/ViewReviews';
import { RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-reviews-dialog',
  imports: [CommonModule, MatPaginatorModule, MatDialogModule, FormsModule,RouterModule],
  templateUrl: './reviews-dialog.html',
  styleUrl: './reviews-dialog.css'
})

export class ReviewsDialog {
  searchText: string = '';
  reviews: ViewReview[] = [];

  userLocation: string = "Alexandria,Egypt";
  private router = inject(Router);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reviews: ViewReview[] },
    private dialogRef: MatDialogRef<ReviewsDialog>,
  ) {
    this.reviews = data.reviews;
  }

  get filteredReviews(): ViewReview[] {
    return this.reviews.filter(review =>
      review.reviewText.toLowerCase().includes(this.searchText.toLowerCase()) ||
      review.userFullName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

 goToPublicProfile(userId: string): void {
  console.log('Navigating to user:', userId); 
  this.closeDialog(); 
  this.router.navigate(['/public', userId]);
}

}
