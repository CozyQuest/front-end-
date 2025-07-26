import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { User } from '../../../core/interfaces/user.model';
import { Property } from '../../../core/interfaces/property.model';
import { PropertyService } from '../../../core/services/property.service';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import feather from 'feather-icons';
// import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

// import { CarouselGrid } from '../../../shared/carousel-grid/carousel-grid';
// import { ProgressSpinner } from 'primeng/progressspinner';


@Component({
  selector: 'app-profile-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css'
})
export class ProfileDetails  {
 user!: User;
  properties: Property[] = [];
  fullName: string = '';
  userId = 1; 
  dropdownOpen = false;

  constructor(
  private propertyService: PropertyService,
  private userService: UserService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}


  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (
      this.dropdownRef &&
      this.dropdownRef.nativeElement &&
      !this.dropdownRef.nativeElement.contains(event.target)
    ) {
      this.dropdownOpen = false;
    }
  }
  

  ngOnInit(): void {
    this.user = this.userService.getUserById(this.userId)!;
    this.fullName = `${this.user.fname} ${this.user.lname}`;

    // filter properties owned by this user
    this.properties = this.propertyService['properties'].filter(
      p => p.owner.id === this.userId
    );

   //feather.replace();
  }

  // ngAfterViewInit(): void {
  //    document.addEventListener('DOMContentLoaded', function () {
  //   feather.replace();
  // });
  // }

  getRatingAverage(ratings: { rating: number }[]): string {
    if (!ratings.length) return '0.0(0)';
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / ratings.length;
    return `${avg.toFixed(1)}(${ratings.length})`;
  }
}
