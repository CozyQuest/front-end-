import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUserProfile, EditUserProfileService,getProfile } from '../../../core/services/edit-profileService';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.html',
})
export class EditProfile implements OnInit {
  profileImage: string = '';
  firstName: string = '';
  lastName: string = '';
  PhoneNumber: string = '';
  
  // These will be loaded from existing profile and sent back unchanged
  userId: string = '';
  currentEmail: string = '';

  constructor(private router: Router, 
             private userService: EditUserProfileService,
             private authService: AuthService) {
    // Get user ID from auth service
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.nameidentifier;
    } else {
      // If no authenticated user, redirect to login
      this.authService.logout();
    }
  }

  ngOnInit(): void {
    // Load existing profile data
    this.loadCurrentProfile();
  }

  loadCurrentProfile(): void {
    if (!this.userId) {
      console.error('No user ID available');
      return;
    }

    this.userService.getProfile(this.userId).subscribe({
      next: (profile) => {
        console.log('Profile loaded successfully:', profile);
        this.firstName = profile.fname;
        this.lastName = profile.lname;
        this.profileImage = profile.profilePicUrl;
        this.currentEmail = profile.email; // Get email from profile response
      },
      error: (error) => {
        console.error('Failed to load profile:', error);
        // If profile load fails, try to get email from auth token as fallback
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser.name) {
          this.currentEmail = currentUser.name;
        } else {
          console.warn('Could not get email from auth service');
          this.currentEmail = ''; // We'll need to handle this case
        }
        alert('Failed to load profile data. Some fields may be empty.');
      }
    });
  }

  loadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, JPEG, PNG)');
        return;
      }

      // Validate file size (optional - e.g., 2MB limit)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('File size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    // Validate required fields
    if (!this.firstName.trim() || !this.lastName.trim()) {
      alert('First Name and Last Name are required');
      return;
    }

    console.log('Form data before sending:', {
      firstName: this.firstName,
      lastName: this.lastName,
      PhoneNumber: this.PhoneNumber,
      profileImage: this.profileImage ? 'Image selected' : 'No image'
    });

    // Create payload with all required fields (including unchanged email)
    const updatedUser: EditUserProfile = {
      id: this.userId,
      fname: this.firstName.trim(),
      lname: this.lastName.trim(),
      email: this.currentEmail,
      PhoneNumber: this.PhoneNumber.trim(),
      profilePicUrl: this.profileImage
    };

    console.log('Payload being sent to API:', updatedUser);

    this.userService.updateProfile(updatedUser).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        console.log('Response type:', typeof response);
        console.log('Response content:', response);
        alert('Changes saved successfully.');
      },
      error: (error) => {
        console.error('Update failed:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        console.error('Full error object:', error);
        
        // Handle specific error cases
        if (error.status === 400) {
          const errorMessage = error.error?.message || error.error || 'Bad Request - Please check your input data';
          alert(`Failed to save changes: ${errorMessage}`);
        } else if (error.status === 401) {
          alert('Unauthorized - Please log in again');
          this.router.navigate(['/login']);
        } else if (error.status === 500) {
          alert('Server error - Please try again later');
        } else {
          alert('Failed to save changes. Please try again.');
        }
      }
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteProfile(this.userId).subscribe({
        next: (response) => {
          console.log('Delete successful:', response);
          alert('Account deleted successfully.');
          // Clear any stored auth data and redirect to login
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Delete failed:', error);
          const errorMessage = error.error?.message || 'Unknown error occurred';
          alert(`Failed to delete account: ${errorMessage}`);
        }
      });
    }
  }

  changePassword(): void {
    this.router.navigate(['/change-pass']);
  }
}