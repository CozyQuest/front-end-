import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserPublicProfile } from '../../../core/interfaces/UserPublicProfile';
import { OwnedProperties } from '../owned-properties/owned-properties';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  imports: [CommonModule,OwnedProperties,RouterModule],
  templateUrl: './public-profile.html',
  styleUrl: './public-profile.css'
})
export class PublicProfile {
private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user: UserPublicProfile | null = null;
  fullName = '';
  userLanguage: string = 'English, Japanese, Chinese';
  userBirthday: string = '2nd March, 1996';
  userLocation: string = 'Alexandria,Egypt';        
  userRole: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getPublicProfile(userId).subscribe({
          next: (data) => {
            this.user = data;
            this.fullName = `${data.fname} ${data.lname}`;
            this.userRole = data.role; 
          },
        });
      }
    });
  }
}


