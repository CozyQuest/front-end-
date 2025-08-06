import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { UserService } from '../../../core/services/user.service';
import { OwnedProperties } from '../owned-properties/owned-properties';
import { RentedProperties } from '../rented-properties/rented-properties';
import { UserPrivateProfile } from '../../../core/interfaces/UserPrivateProfile.model';
import { RentingHistory } from '../renting-history/renting-history';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, OwnedProperties,RentedProperties,RentingHistory],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',

})

export class ProfileDetails {
  defaultAvatar : string = "https://i.pinimg.com/736x/82/85/96/828596ef925a10e8c1a76d3a3be1d3e5.jpg";
 user: UserPrivateProfile | null = null;
 activeTab = signal<'my' | 'rented' | 'history'>('my');
  userRole: string | null = null;
  userLanguage: string = 'English, Japanese, Chinese';
  userBirthday: string = '2nd March, 1996';
  userLocation: string = 'Alexandria,Egypt';

  constructor(private userService: UserService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    const fetchedUser = await this.userService.getPrivateProfile();
    this.user = fetchedUser;

    // Get user role from AuthService
    this.userRole = this.authService.getUserRole();
    
    // Set initial active tab based on role
    if (this.userRole === 'Host') {
      this.activeTab.set('my');
    }
  }

  get fullName(): string {
    return this.user ? `${this.user.fname} ${this.user.lname}` : '';
  }

  get userId(): string {
    return this.user?.id || '';
  }

  showMyProperties() {
    this.activeTab.set('my');
  }

  showRentedProperties() {
    this.activeTab.set('rented');
  }

  showRentingHistory() {
    this.activeTab.set('history');
  }
}
