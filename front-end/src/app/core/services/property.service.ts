import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = [
    {
      id: 1,
      title: '4BHK Luxury Family Home',
      description: 'A beautiful, spacious family home with modern interiors and lush garden.',
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
      Area: 220,
      Guests: 8,
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
        { id: 2, url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }
      ],
      ratings: [{ rating: 3 }, { rating: 2 }, { rating: 1 }],
      services: [
        { id: 1, name: 'WiFi' },
        { id: 2, name: 'Parking' },
        { id: 3, name: 'Pool' }
      ],
      owner: {
        id: "1",
        fname: 'John',
        lname: 'Doe',
        email: 'owner@example.com',
        phone: '+123456789',
        profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: 'Alexandria, Egypt'
      }
    },
    {
      id: 2,
      title: 'Cozy Studio Near Metro',
      description: 'Perfect for singles or couples, this studio is walking distance from the metro.',
      longitude: -73.935242,
      latitude: 40.730610,
      roomCount: 1,
      bathroomCount: 1,
      rentPerDay: 75,
      country: 'USA',
      city: 'New York',
      district: 'Brooklyn',
      buildingNo: '220',
      flatNo: 'B1',
      Area: 45,
      Guests: 2,
      images: [
        { id: 1, url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/504889928.jpg?k=4c3d6395069d1aea6ceb2ddff7b0a522f05d3f8fbd5c152870ab33ab7cf0300a&o=&hp=1' }
      ],
      ratings: [{ rating: 4 }, { rating: 5 }, { rating: 4 }],
      services: [{ id: 1, name: 'WiFi' }, { id: 2, name: 'Heating' }],
      owner: {
        id: "1",
        fname: 'John',
        lname: 'Doe',
        email: 'owner@example.com',
        phone: '+123456789',
        profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: 'Alexandria, Egypt'
      }
    },
    {
      id: 3,
      title: 'Luxury Villa with Private Pool',
      description: 'This villa features 4 bedrooms, a private pool, and a stunning sea view.',
      longitude: 2.3522,
      latitude: 48.8566,
      roomCount: 4,
      bathroomCount: 3,
      rentPerDay: 350,
      country: 'France',
      city: 'Nice',
      district: 'Côte d\'Azur',
      buildingNo: '17',
      flatNo: 'V1',
      Area: 300,
      Guests: 10,
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914' }
      ],
      ratings: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
      services: [
        { id: 1, name: 'WiFi' },
        { id: 2, name: 'Pool' },
        { id: 3, name: 'Gym' },
        { id: 4, name: 'Air Conditioning' }
      ],
      owner: {
        id:" 1",
        fname: 'John',
        lname: 'Doe',
        email: 'owner@example.com',
        phone: '+123456789',
        profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: 'Alexandria, Egypt'
      }
    },
    {
      id: 4,
      title: 'Downtown Apartment 2BHK',
      description: 'Stylish 2-bedroom apartment in the heart of downtown.',
      longitude: -0.1276,
      latitude: 51.5074,
      roomCount: 2,
      bathroomCount: 1,
      rentPerDay: 120,
      country: 'UK',
      city: 'London',
      district: 'Soho',
      buildingNo: '45',
      flatNo: '9C',
      Area: 85,
      Guests: 4,
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914' }
      ],
      ratings: [{ rating: 4 }, { rating: 4 }, { rating: 5 }],
      services: [
        { id: 1, name: 'WiFi' },
        { id: 2, name: 'Parking' },
        { id: 3, name: 'Heating' }
      ],
      owner: {
        id: "1",
        fname: 'John',
        lname: 'Doe',
        email: 'owner@example.com',
        phone: '+123456789',
        profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: 'Alexandria, Egypt'
      }
    },
    {
      id: 5,
      title: 'Modern Apartment with Skyline View',
      description: 'High-rise modern apartment offering incredible city views.',
      longitude: 139.6917,
      latitude: 35.6895,
      roomCount: 3,
      bathroomCount: 2,
      rentPerDay: 180,
      country: 'Japan',
      city: 'Tokyo',
      district: 'Shinjuku',
      buildingNo: '88',
      flatNo: 'PH7',
      Area: 110,
      Guests: 6,
      images: [
        { id: 1, url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae' }
      ],
      ratings: [{ rating: 5 }, { rating: 5 }, { rating: 4 }],
      services: [
        { id: 1, name: 'WiFi' },
        { id: 2, name: 'Gym' },
        { id: 3, name: 'Air Conditioning' }
      ],
      owner: {
        id: "1",
        fname: 'John',
        lname: 'Doe',
        email: 'owner@example.com',
        phone: '+123456789',
        profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: 'Alexandria, Egypt'
      }
    }
  ];

  getPropertyById(id: number): Observable<Property> {
    const property = this.properties.find(p => p.id === id)!;
    return of(property);
  }

  getAllProperties(): Observable<Property[]> {
    return of(this.properties);
  }
}