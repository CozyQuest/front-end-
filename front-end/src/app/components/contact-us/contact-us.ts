import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Card } from "../../shared/card/card";

// Interface for contact form data
export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Interface for API response
export interface ContactResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [Card, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage = '';
  successMessage = '';
  
  private baseUrl = 'https://localhost:7279'; // Same base URL as other services

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]*$/) // Only letters and spaces
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)
      ]],
      message: ['', [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]]
    });
  }

  /**
   * Get form control for easy access in template
   */
  get f() {
    return this.contactForm.controls;
  }

  /**
   * Check if a field has a specific error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched || this.isSubmitted));
  }

  /**
   * Check if a field is valid
   */
  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  /**
   * Send contact form data to server
   */
  sendEmail(contactData: ContactRequest) {
    return this.http.post<ContactResponse>(`${this.baseUrl}/api/contact/sendmail`, contactData);
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    const contactData: ContactRequest = this.contactForm.value;

    this.sendEmail(contactData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.successMessage = response.message || 'Your message has been sent successfully! We will get back to you soon.';
          this.contactForm.reset();
          this.isSubmitted = false;
        } else {
          this.errorMessage = response.message || 'Failed to send message. Please try again.';
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Contact form error:', error);
        
        if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else if (error.status >= 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  /**
   * Clear messages
   */
  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
