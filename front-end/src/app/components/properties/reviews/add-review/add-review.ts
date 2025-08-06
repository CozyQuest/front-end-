import { Component, Input, Output, signal, inject, WritableSignal,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule } from '@angular/common';
import { PostReviewService } from '../../../../core/services/post-review.service';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PostRate } from '../../../../core/interfaces/postRate';
import { PostReview } from '../../../../core/interfaces/postReview';


@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-review.html',
  styleUrl: './add-review.css'
})
export class AddReview {
// @Input() propertyId: string = '';
//   hoverRating = 0;
//   selectedRating = 0;
//   showReview = false;
//   errorMessage: WritableSignal<string | null> = signal(null);
//   successMessage: WritableSignal<string | null> = signal(null);
//   starArray = [1, 2, 3, 4, 5];
//   form!: FormGroup;
//   isLoggedIn = false;
//   isFormVisible = true;
//   private fb = inject(FormBuilder);
//   private reviewService = inject(PostReviewService);
//   private authService = inject(AuthService);

//   ngOnInit(): void {
//     this.isLoggedIn = this.authService.isAuthenticated();
//     this.form = this.fb.group({
//       reviewText: [''],
//       rate: [null],
//     });
//   }

//   setRating(rating: number) {
//     this.selectedRating = rating;
//     this.form.patchValue({ rate: rating });
//   }
//   withReview(): boolean {
//     return this.showReview;
//   }
//   onToggleWithReview(event: Event) {
//     const checkbox = event.target as HTMLInputElement;
//     this.showReview = checkbox.checked;
//     const reviewControl = this.form.get('reviewText');
//     if (this.showReview) {
//       reviewControl?.setValidators([Validators.required]);
//     } else {
//       reviewControl?.clearValidators();
//     }
//     reviewControl?.updateValueAndValidity();
//   }

//   @Output() submitted = new EventEmitter<void>();

//   onSubmit() {
//   this.errorMessage.set(null);
//   this.successMessage.set(null);

//   if (!this.selectedRating) {
//     this.errorMessage.set('Please select a rating.');
//     return;
//   }

//   const reviewText = this.form.get('reviewText')?.value?.trim();
//   const postData = {
//     rate: this.selectedRating,
//     reviewText: reviewText || '',
//   };

//   const request$ = this.showReview
//     ? this.reviewService.postReview(this.propertyId, postData)
//     : this.reviewService.postRating(this.propertyId, { rate: this.selectedRating });

//   request$.subscribe({
//     next: () => {
//       this.successMessage.set('Review submitted successfully.');
//       this.form.reset();
//       this.selectedRating = 0;
//       this.showReview = false;

//       this.isFormVisible = false;

//       const event = new CustomEvent('submitted');
//       window.dispatchEvent(event);
//     },
//     error: (error) => {
//       const message = error.error || 'An unexpected error occurred.';
//       if (error.status === 403 && typeof message === 'string') {
//         if (message.toLowerCase().includes('rent')) {
//           this.errorMessage.set('You must rent the property before reviewing.');
//         } else {
//           this.errorMessage.set('You must log in first.');
//         }
//       } else if ([400, 404, 409].includes(error.status)) {
//         this.errorMessage.set(message);
//       }
      //  else {
      //   this.errorMessage.set('An unexpected error occurred.');
      // }
//     }
//   });
// }
@Input() propertyId!: string;

  form: FormGroup;
  showReview = false;
  selectedRating = 0;
  hoverRating = 0;

  successMessage: WritableSignal<string> = signal('');
  errorMessage: WritableSignal<string> = signal('');
  isFormVisible = true;

  constructor(
    private fb: FormBuilder,
    private reviewService: PostReviewService
  ) {
    this.form = this.fb.group({
      reviewText: ['']
    });
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  onToggleWithReview(event: any): void {
    this.showReview = event.target.checked;

    const reviewControl = this.form.get('reviewText');
    if (this.showReview) {
      reviewControl?.setValidators([Validators.required]);
    } else {
      reviewControl?.clearValidators();
    }
    reviewControl?.updateValueAndValidity();
  }

 onSubmit(): void {
  this.successMessage.set('');
  this.errorMessage.set('');

  if (!this.selectedRating) {
    this.errorMessage.set('Please select a rating.');
    return;
  }

  if (this.showReview && this.form.invalid) {
    this.errorMessage.set('Please write your review.');
    return;
  }

  const ratingPayload: PostRate = {
    rate: this.selectedRating
  };

  const reviewPayload: PostReview = {
    reviewText: this.form.value.reviewText || '',
    rate: this.selectedRating
  };

  this.reviewService.postRating(this.propertyId, ratingPayload).subscribe({
    next: () => {
      if (this.showReview) {
        this.reviewService.postReview(this.propertyId, reviewPayload).subscribe({
          next: () => {
            this.successMessage.set('Review submitted successfully.');
            this.resetForm();
          },
          error: (err) => {
            const msg = err?.error?.message || err?.error || 'Failed to post review.';
            this.errorMessage.set(msg);
          }
        });
      } else {
        this.successMessage.set('Rating submitted successfully.');
        this.resetForm();
      }
    },
    error: (err) => {
      const msg = err?.error?.message || err?.error || 'Failed to post rating.';
      if (err.status === 403 && typeof msg === 'string') {
        if (msg.toLowerCase().includes('rent')) {
          this.errorMessage.set('You must rent the property before rating.');
        } else {
          this.errorMessage.set('You must be logged in.');
        }
      } else if (err.status === 409 || err.status === 400 || err.status === 404) {
        this.errorMessage.set(msg);
      } else {
        this.errorMessage.set('An unexpected error occurred.');
      }
    }
  });
}

  private resetForm(): void {
    this.form.reset();
    this.selectedRating = 0;
    this.hoverRating = 0;
    this.showReview = false;
    this.isFormVisible = false;

    setTimeout(() => {
      this.successMessage.set('');
      this.isFormVisible = true;
    }, 3000);
  }

  }


