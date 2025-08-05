import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service'; // adjust path
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/edit-user-profile.service';

@Component({
  imports:[CommonModule,FormsModule],
  selector: 'app-change-password',
  templateUrl: './change-pass.html',
})
export class ChangePassword implements OnInit {
  isLoggedIn: boolean = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user; // true if user is logged in
  }

  updatePassword(): void {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    this.userService.changePassword(this.oldPassword, this.newPassword, this.confirmPassword)
      .subscribe({
        next: () => {
          alert('Password updated successfully.');
          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          const message = typeof err.error === 'string' ? err.error : 'Unknown error';
          alert('Failed to update password:\n' + message);
        }
      });
  }
}
