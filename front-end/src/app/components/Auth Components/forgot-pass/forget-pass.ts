import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports:[CommonModule,FormsModule],
  selector: 'app-forgot-pass',
  templateUrl: './forget-pass.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  resetPassword(): void {
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Simulated request – replace this with a real service call
    console.log('Sending password reset for:', this.email);
    alert('Password reset request submitted. Please check your email.');

    // Optionally, reset form fields
    this.email = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
