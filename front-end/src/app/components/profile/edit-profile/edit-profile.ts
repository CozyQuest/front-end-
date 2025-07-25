import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from '../../../core/services/edit-user-profile.service';
import { FormsModule } from '@angular/forms';

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
  email: string = '';
  phone: string = '';
  website: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // ✅ New fields
  location: string = '';
  birthday: string = '';
  language: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data: UserProfile) => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phone = data.phone || '';
      this.website = data.website || '';
      this.profileImage = data.profileImage || 'assets/images/client/07.jpg';

      this.location = data.location || '';
      this.birthday = data.birthday || '';
      this.language = data.language || '';
    });
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  loadFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(): void {
    const userData: UserProfile = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      website: this.website,
      profileImage: this.profileImage,
      location: this.location,
      birthday: this.birthday,
      language: this.language
    };

    this.userService.updateUserProfile(userData).subscribe({
      next: () => alert('Changes saved successfully.'),
      error: () => alert('Failed to save changes.'),
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteAccount().subscribe({
        next: () => alert('Account deleted successfully.'),
        error: () => alert('Failed to delete account.'),
      });
    }
  }

  addContact(): void {
    // Already handled in saveChanges since phone & website are part of the profile
    this.saveChanges();
  }
}


