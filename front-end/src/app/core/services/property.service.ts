import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
 private properties: Property[] = [
    {
      id: 1,
      title: '4BHK Luxury Family Home',
      description: `Welcome to this stunning 4-bedroom family home, nestled in a quiet, upscale neighborhood.
Boasting an open-concept layout, it features a spacious living area filled with natural light.
The modern kitchen is equipped with top-of-the-line appliances and a large island for gatherings.
Each bedroom offers ample space, with the master suite including a walk-in closet and private bath.
Enjoy your mornings on the charming front porch or evenings on the private backyard patio.
High ceilings, hardwood floors, and elegant finishes elevate the home’s character.
A two-car garage and a fully fenced yard provide convenience and security.
Energy-efficient windows and central air ensure year-round comfort.
Close to top-rated schools, parks, and shopping centers.
This home blends comfort, style, and location for the perfect lifestyle.`,
      longitude: -91.1871,
      latitude: 30.4515,
      roomCount: 4,
      bathroomCount: 4,
      rentPerDay: 1497,
      country: 'USA',
      city: 'Baton Rouge',
      district: 'Hillshire',
      buildingNo: '10765',
      flatNo: 'A2',
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
        { id: 2, url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }
      ],
      ratings: [{ rating: 3 }, { rating: 2 }, { rating: 1 }],
      services: [
        { id: 1, name: 'WiFi' },
        { id: 2, name: 'Parking' },
        { id: 3, name: 'Pool' },
        { id: 4, name: 'Gym' },
        { id: 5, name: 'Air Conditioning' },
        { id: 6, name: 'Heating' }
      ],
      owner: {
        id: 1,
        fname: 'John',
        lname: 'Doe',
        email: 'owner@example.com',
        phone: '+123456789',
        profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      }
    }
  ];

  getPropertyById(id: number): Observable<Property> {
    const property = this.properties.find(p => p.id === id)!;
    return of(property);
  }
}
