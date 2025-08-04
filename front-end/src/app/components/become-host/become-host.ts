import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from '../../shared/card/card';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { BecomeHostService } from '../../core/services/become-host.service';
import { FileValidationService } from '../../core/services/file-validation.service';
import { BecomeHostRepository } from '../../core/repositories/become-host.repository';

// Interfaces
import { 
  ImageUploadType, 
  BecomeHostFormState, 
  ImageUploadState,
  FileValidationResult 
} from '../../core/interfaces/become-host.interface';

@Component({
  selector: 'app-become-host',
  imports: [Card, CommonModule, FormsModule, ButtonModule],
  templateUrl: './become-host.html',
  styleUrl: './become-host.css'
})
export class BecomeHost implements OnInit, OnDestroy {
  // Form state using typed interfaces
  formState: BecomeHostFormState = {
    frontImage: { file: null, preview: null },
    backImage: { file: null, preview: null },
    isSubmitting: false,
    errorMessage: '',
    successMessage: ''
  };

  // Subject for managing subscriptions
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private becomeHostService: BecomeHostService,
    private fileValidationService: FileValidationService,
    private becomeHostRepository: BecomeHostRepository
  ) {}
  ngOnInit(): void {
    // Initialize component
    console.log('BecomeHost requirements:', this.becomeHostRepository.getSubmissionRequirements());
    
    // Note: BecomeHostGuard already prevents access for users with pending requests
    // This component will only load for users who haven't submitted a request yet
  }

  ngOnDestroy(): void {
    // Complete all subscriptions to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFileSelected(event: Event, type: ImageUploadType): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.processFile(file, type);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent, type: ImageUploadType): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    const file = files?.[0];

    if (file && file.type.startsWith('image/')) {
      this.processFile(file, type);
    }
  }

  private processFile(file: File, type: ImageUploadType): void {
    // Clear previous error
    this.formState.errorMessage = '';

    // Validate file using service
    const validationResult: FileValidationResult = this.fileValidationService.validateFile(file);
    
    if (!validationResult.isValid) {
      this.formState.errorMessage = validationResult.error || 'Invalid file';
      return;
    }

    // Create preview using service with Observable
    this.fileValidationService.createImagePreview(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (preview) => {
          // Update form state with explicit property assignment
          if (type === 'front') {
            this.formState.frontImage = {
              file: file,
              preview: preview
            };
          } else {
            this.formState.backImage = {
              file: file,
              preview: preview
            };
          }
        },
        error: (error) => {
          this.formState.errorMessage = 'Failed to process image file';
          console.error('Image preview error:', error);
        }
      });
  }

  removeImage(type: ImageUploadType): void {
    if (type === 'front') {
      this.formState.frontImage = {
        file: null,
        preview: null
      };
    } else {
      this.formState.backImage = {
        file: null,
        preview: null
      };
    }
  }



  onSubmit(): void {
    // Validate required files
    if (!this.becomeHostRepository.validateApplicationData(
      this.formState.frontImage.file, 
      this.formState.backImage.file
    )) {
      this.formState.errorMessage = 'Please select both front and back images';
      return;
    }

    this.formState.isSubmitting = true;
    this.formState.errorMessage = '';
    this.formState.successMessage = '';

    // Submit using repository with Observable pattern
    this.becomeHostRepository.submitHostApplication(
      this.formState.frontImage.file!,
      this.formState.backImage.file!
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        // Display success message from backend
        this.formState.successMessage = response?.respond || 'Application submitted successfully! We will review your documents and get back to you soon.';
        
        // Reset form after successful submission
        this.resetForm();

        // Redirect to submission under review page after 2 seconds using RxJS timer
        timer(2000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.router.navigate(['/submission-under-review']);
          });

        this.formState.isSubmitting = false;
      },
      error: (error) => {
        // Error handling is now managed by the service
        this.formState.errorMessage = error.message || 'Failed to submit application. Please try again.';
        this.formState.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.formState.frontImage = { file: null, preview: null };
    this.formState.backImage = { file: null, preview: null };
  }

  // Getter methods for template binding
  get frontImageFile(): File | null {
    return this.formState.frontImage.file;
  }

  get backImageFile(): File | null {
    return this.formState.backImage.file;
  }

  get frontImagePreview(): string | null {
    return this.formState.frontImage.preview;
  }

  get backImagePreview(): string | null {
    return this.formState.backImage.preview;
  }

  get isSubmitting(): boolean {
    return this.formState.isSubmitting;
  }

  get errorMessage(): string {
    return this.formState.errorMessage;
  }

  get successMessage(): string {
    return this.formState.successMessage;
  }


}
