import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordService } from '../../../core/services/forget-password-service';

@Component({
  imports:[CommonModule,FormsModule],
  selector: 'app-forgot-pass',
  templateUrl: './forget-pass.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private forgetPasswordService: ForgetPasswordService) {}

  resetPassword(): void {
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.forgetPasswordService
      .resetPassword(this.email, this.newPassword, this.confirmPassword)
      .subscribe({
        next: () => {
          alert('Password reset successful. Please log in with your new password.');
          this.email = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          const message = typeof err.error === 'string' ? err.error : 'Reset failed.';
          alert(message);
        },
      });
  }
}
