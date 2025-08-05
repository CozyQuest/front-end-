import { Component, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/interfaces/User';
import { UserService } from '../../../core/services/user.service';
import { OwnedProperties } from '../owned-properties/owned-properties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  imports: [OwnedProperties,CommonModule],
  templateUrl: './public-profile.html',
  styleUrl: './public-profile.css'
})
export class PublicProfile {
user: User | null = null;
  activeTab = signal<'my' | 'rented' | 'history'>('rented'); 
  userRole: string | null = null;
  userLanguage: string = 'English, Japanese, Chinese';
  userBirthday: string = '2nd March, 1996';
  userLocation: string = 'Alexandria,Egypt';

  constructor(private userService: UserService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    const fetchedUser = await this.userService.getPrivateProfile();
    this.user = fetchedUser;

    this.userRole = this.authService.getUserRole();
    
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
