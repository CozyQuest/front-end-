import { EventEmitter,Component, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule,NgClass,CommonModule],
  templateUrl: './add-review.html',
  styleUrl: './add-review.css'
})
export class AddReview {
 @Input() userId!: number;
  @Input() propertyId!: number;
  // @Output() reviewSubmitted = new EventEmitter<any>();

  form!: FormGroup;
  selectedRating: number = 0;
  hoverRating: number = 0;
  withReview = signal(false);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      review: ['']
    });
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  // onSubmit() {
  //   if (!this.selectedRating) return;

  //   const payload = {
  //     userId: this.userId,
  //     propertyId: this.propertyId,
  //     rating: this.selectedRating,
  //     review: this.withReview() ? this.form.value.review?.trim() || null : null,
  //     date: new Date()
  //   };

  //   this.reviewSubmitted.emit(payload);
  //   this.selectedRating = 0;
  //   this.hoverRating = 0;
  //   this.form.reset();
  //   this.withReview.set(false);
  // }

  onToggleWithReview(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  this.withReview.set(checkbox.checked);
}

@Output() reviewSubmitted = new EventEmitter<any>();

onSubmit() {
  const review = this.form.value;
  // TODO: send review to backend
  this.reviewSubmitted.emit(review);
}
}
