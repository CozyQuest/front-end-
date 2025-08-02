import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service'; // adjust path
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports:[CommonModule,FormsModule],
  selector: 'app-change-password',
  templateUrl: './change-pass.html',
})
export class changePassword implements OnInit {
  isLoggedIn: boolean = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user; // true if user is logged in
  }

  updatePassword(): void {
    // Handle password update logic here
  }
}
