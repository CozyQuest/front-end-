import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { User } from '../../../core/interfaces/user.model';
import { UserService } from '../../../core/services/user.service';
import { OwnedProperties } from '../owned-properties/owned-properties';
import { RentedProperties } from '../rented-properties/rented-properties';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, OwnedProperties,RentedProperties],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',

})

export class ProfileDetails {
  user!: User;
  fullName: string = '';
  userId = 1;

  activeTab = signal<'my' | 'rented'>('my');

  userSkills: string = 'html, css, js, mysql';
  userLanguage: string = 'English, Japanese, Chinese';
  userWebsite: string = 'https://www.cristina.com';
  userBirthday: string = '2nd March, 1996';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserById(this.userId)!;
    this.fullName = `${this.user.fname} ${this.user.lname}`;
  }

  showMyProperties() {
    this.activeTab.set('my');
  }

  showRentedProperties() {
    this.activeTab.set('rented');
  }
} 