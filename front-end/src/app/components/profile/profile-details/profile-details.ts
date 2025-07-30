import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { UserService } from '../../../core/services/user.service';
import { OwnedProperties } from '../owned-properties/owned-properties';
import { RentedProperties } from '../rented-properties/rented-properties';
import { UserPublicProfile } from '../../../core/interfaces/UserPublicProfile';
import { UserProfile } from '../../../core/interfaces/UserProfile';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, OwnedProperties,RentedProperties],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',

})

export class ProfileDetails {
  user!: UserProfile | UserPublicProfile;
  fullName: string = '';

  loggedInUserId = 2;
  userId = 1;

  isOwnProfile = false;
  activeTab = signal<'my' | 'rented'>('my');

  userSkills: string = 'html, css, js, mysql';
  userLanguage: string = 'English, Japanese, Chinese';
  userWebsite: string = 'https://www.cristina.com';
  userBirthday: string = '2nd March, 1996';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isOwnProfile = this.userId === this.loggedInUserId;

    if (this.isOwnProfile) {
      const full = this.userService.getFullUserById(this.userId);
      if (full) {
        this.user = full;
        this.fullName = `${full.fname} ${full.lname}`;
      }
    } else {
      const publicUser = this.userService.getPublicUserById(this.userId);
      if (publicUser) {
        this.user = publicUser;
        this.fullName = `${publicUser.fname} ${publicUser.lname}`;
      }
    }
  }

  get fullUser(): UserProfile | null {
    return this.isOwnProfile ? this.user as UserProfile : null;
  }

  showMyProperties() {
    this.activeTab.set('my');
  }

  showRentedProperties() {
    this.activeTab.set('rented');
  }
} 