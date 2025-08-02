import { Component, Input } from '@angular/core';
import { Review } from '../../../../core/interfaces/Review';
import { MatDialog } from '@angular/material/dialog';
import { ReviewsDialog } from '../reviews-dialog/reviews-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews-list',
  imports: [CommonModule],
  templateUrl: './reviews-list.html',
  styleUrl: './reviews-list.css'
})
export class ReviewsList {
 @Input() reviews: Review[] = [];

  constructor(private dialog: MatDialog) {}

openDialog(): void {
  this.dialog.open(ReviewsDialog, {
    width: '800px',
    panelClass: 'custom-dialog-container',
    data: { reviews: this.reviews }
  });
}
}
