import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pending-requests',
  imports: [CommonModule],
  templateUrl: './pending-requests.html',
  styleUrl: './pending-requests.css'
})
export class PendingRequests {
  pendingProperties = [
    {
      img: '/assets/images/property/1.jpg',
      title: 'Modern Apartment in Downtown',
      date: '2025-07-25',
      price: 1200,
      type: 'Apartment',
      status: 'Pending',
    },
    {
      img: '/assets/images/property/2.jpg',
      title: 'Spacious Villa with Garden',
      date: '2025-07-24',
      price: 2500,
      type: 'Villa',
      status: 'Pending',
    },
  ];

  approve(property: any) {
    console.log('Approved:', property.title);
    // logic to update backend or state
  }

  reject(property: any) {
    console.log('Rejected:', property.title);
    // logic to update backend or state
  }

}
