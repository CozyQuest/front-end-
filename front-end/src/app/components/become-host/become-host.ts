import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from '../../shared/card/card';

@Component({
  selector: 'app-become-host',
  imports: [Card, CommonModule, FormsModule, ButtonModule],
  templateUrl: './become-host.html',
  styleUrl: './become-host.css'
})
export class BecomeHost {
  frontImageFile: File | null = null;
  backImageFile: File | null = null;
  frontImagePreview: string | null = null;
  backImagePreview: string | null = null;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  private baseUrl = 'https://localhost:7279';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event, type: 'front' | 'back'): void {
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

  onDrop(event: DragEvent, type: 'front' | 'back'): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    const file = files?.[0];

    if (file && file.type.startsWith('image/')) {
      this.processFile(file, type);
    }
  }

  private processFile(file: File, type: 'front' | 'back'): void {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'File size must be less than 5MB';
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please select a valid image file';
      return;
    }

    // Clear any previous error
    this.errorMessage = '';

    // Store the file
    if (type === 'front') {
      this.frontImageFile = file;
    } else {
      this.backImageFile = file;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'front') {
        this.frontImagePreview = reader.result as string;
      } else {
        this.backImagePreview = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage(type: 'front' | 'back'): void {
    if (type === 'front') {
      this.frontImageFile = null;
      this.frontImagePreview = null;
    } else {
      this.backImageFile = null;
      this.backImagePreview = null;
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.frontImageFile || !this.backImageFile) {
      this.errorMessage = 'Please select both front and back images';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('frontImage', this.frontImageFile, this.frontImageFile.name);
      formData.append('backImage', this.backImageFile, this.backImageFile.name);

      // Send the request (don't set Content-Type header - Angular will set it automatically with boundary)
      const response = await this.http.post(`${this.baseUrl}/api/User/BecomeHostRequest/`, formData, {
        headers: {
          'accept': '*/*'
          // Note: Don't set Content-Type for FormData - Angular sets it automatically with boundary
        }
      }).toPromise() as any;

      // Display the success message from backend
      this.successMessage = response?.respond || 'Application submitted successfully! We will review your documents and get back to you soon.';
      
      // Reset form after successful submission
      this.resetForm();

      // Redirect to index page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);

    } catch (error: any) {
      console.error('Error submitting application:', error);
      console.log('Full error structure:', JSON.stringify(error, null, 2));
      
      // Handle specific backend response format
      let backendMessage = '';
      
      // Check for authorization errors first
      if (error.status === 401) {
        this.errorMessage = 'You must be logged in to submit a host application.';
      } else {
        // Handle other errors - extract backend message
        if (error.error) {
          // Backend returns errors in "respond" property
          backendMessage = error.error.respond || 
                          error.error.message || 
                          error.error.title || 
                          error.error.detail || 
                          error.error.Message || 
                          error.error.errors?.[0]?.message || 
                          (typeof error.error === 'string' ? error.error : '');
        }
        
        // Fallback to direct error properties
        if (!backendMessage) {
          backendMessage = error.respond || 
                          error.message || 
                          error.title || 
                          error.detail || 
                          error.Message || 
                          error.statusText || 
                          '';
        }
        
        // Use backend message or fallback
        this.errorMessage = backendMessage || 'Failed to submit application. Please try again.';
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private resetForm(): void {
    this.frontImageFile = null;
    this.backImageFile = null;
    this.frontImagePreview = null;
    this.backImagePreview = null;
  }
}
