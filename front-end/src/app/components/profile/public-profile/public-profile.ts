import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserPublicProfile } from '../../../core/interfaces/UserPublicProfile';
import { RouterModule } from '@angular/router';
import { PublicOwnedProperties } from '../public-owned-properties/public-owned-properties';

@Component({
  selector: 'app-public-profile',
  imports: [CommonModule,RouterModule,PublicOwnedProperties],
  templateUrl: './public-profile.html',
  styleUrl: './public-profile.css'
})
export class PublicProfile {
private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  defaultAvatar : string = "https://i.pinimg.com/736x/82/85/96/828596ef925a10e8c1a76d3a3be1d3e5.jpg";
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
            this.fullName = `${this.capitalizeName(data.fname)} ${this.capitalizeName(data.lname)}`;
            this.userRole = data.role; 
          },
        });
      }
    });
  }
  private capitalizeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
}


