import { Component,inject,Inject } from '@angular/core';
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

  searchText: string = '';
  reviews: ViewReview[] = [];
  reviewLocations: string[] = [];

  private router = inject(Router);
   defaultAvatar : string = "https://i.pinimg.com/736x/82/85/96/828596ef925a10e8c1a76d3a3be1d3e5.jpg";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reviews: ViewReview[] },
    private dialogRef: MatDialogRef<ReviewsDialog>,
  ) {
    this.reviews = data.reviews;
    this.reviewLocations = this.reviews.map(() => this.getRandomLocation());
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
  this.router.navigate(['/public', userId]).then(() => {
    this.closeDialog(); 
  });
}

 private getRandomLocation(): string {
  const index = Math.floor(Math.random() * this.sampleLocations.length);
  return this.sampleLocations[index];
}

}
