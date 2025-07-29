import { Injectable } from '@angular/core';
import { RentedProperty } from '../interfaces/RentedProperty';

@Injectable({
  providedIn: 'root'
})
export class RentedPropertyService {
  private rentedProperties: RentedProperty[] = [
    {
      id: 101,
      title: 'Urban Studio Downtown',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      userRating: 4,
      checkinDate: '2025-06-01',
      checkoutDate: '2025-06-10',
      totalPrice: 750
    },
    {
      id: 102,
      title: 'Sea View Apartment',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      userRating: 5,
      checkinDate: '2025-05-15',
      checkoutDate: '2025-05-20',
      totalPrice: 600
    },
     {
      id: 102,
      title: 'Sea View Apartment',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      userRating: 5,
      checkinDate: '2025-05-15',
      checkoutDate: '2025-05-20',
      totalPrice: 600
    },
     {
      id: 102,
      title: 'Sea View Apartment',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      userRating: 5,
      checkinDate: '2025-05-15',
      checkoutDate: '2025-05-20',
      totalPrice: 600
    },
     {
      id: 102,
      title: 'Sea View Apartment',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      userRating: 5,
      checkinDate: '2025-05-15',
      checkoutDate: '2025-05-20',
      totalPrice: 600
    },
     {
      id: 102,
      title: 'Sea View Apartment',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      userRating: 5,
      checkinDate: '2025-05-15',
      checkoutDate: '2025-05-20',
      totalPrice: 600
    }
  ];

  getRentedPropertiesByUserId(userId: number): RentedProperty[] {
    // Filter based on userId if needed
    return this.rentedProperties;
  }
}