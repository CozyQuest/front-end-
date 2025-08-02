import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from '../../../core/services/edit-user-profile.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-pass.html',
})
export class changePassword{
updatePassword() {
throw new Error('Method not implemented.');
}
oldPassword: any;
newPassword: any;
confirmPassword: any;
isLoggedIn: any;
email: any;

}


