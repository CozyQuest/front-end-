import { Component,Inject } from '@angular/core';
import { Review } from '../../../../core/interfaces/Review';
import {  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reviews-dialog',
  imports: [CommonModule, MatPaginatorModule, MatDialogModule, FormsModule],
  templateUrl: './reviews-dialog.html',
  styleUrl: './reviews-dialog.css'
})
export class ReviewsDialog {
  searchText: string = '';
  reviews: Review[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reviews: Review[] },
    private dialogRef: MatDialogRef<ReviewsDialog>
  ) {
    this.reviews = data.reviews;
  }

  get filteredReviews(): Review[] {
    return this.reviews.filter(review =>
      review.review.toLowerCase().includes(this.searchText.toLowerCase()) ||
      review.user?.fname?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      review.user?.lname?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
