import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 getReviewsByPropertyId(propertyId: number): Review[] {
    return [
      {
        id: 1,
        userId: 1,
        propertyId,
        rating: 4.5,
        review: 'Amazing stay! Everything was clean and well-organized.',
        date: '2025-07-10',
        user: {
          id: 1,
          fname: 'Sarah',
          lname: 'Connor',
          email: 'sarah@example.com',
          phone: '123-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=1'
        }
      },
      {
        id: 2,
        userId: 2,
        propertyId,
        rating: 3.8,
        review: 'Good experience overall but a bit noisy at night.',
        date: '2025-07-12',
        user: {
          id: 2,
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          phone: '987-654-3210',
          profilePicUrl: 'https://i.pravatar.cc/100?img=2'
        }
      },
      {
        id: 3,
        userId: 3,
        propertyId,
        rating: 5.0,
        review: 'Absolutely perfect. Host was super helpful!',
        date: '2025-07-13',
        user: {
          id: 3,
          fname: 'Emma',
          lname: 'Brown',
          email: 'emma@example.com',
          phone: '321-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=3'
        }
      },
      {
        id: 4,
        userId: 4,
        propertyId,
        rating: 4.2,
        review: 'Nice apartment with great views!',
        date: '2025-07-14',
        user: {
          id: 4,
          fname: 'Mike',
          lname: 'Wilson',
          email: 'mike@example.com',
          phone: '111-222-3333',
          profilePicUrl: 'https://i.pravatar.cc/100?img=4'
        }
      },
      {
        id: 5,
        userId: 5,
        propertyId,
        rating: 3.5,
        review: 'Decent stay, but could use better Wi-Fi.',
        date: '2025-07-15',
        user: {
          id: 5,
          fname: 'Lisa',
          lname: 'White',
          email: 'lisa@example.com',
          phone: '444-555-6666',
          profilePicUrl: 'https://i.pravatar.cc/100?img=5'
        }
      },
      {
        id: 6,
        userId: 1,
        propertyId,
        rating: 4.8,
        review: 'Host was amazing and very responsive!',
        date: '2025-07-16',
        user: {
          id: 1,
          fname: 'Sarah',
          lname: 'Connor',
          email: 'sarah@example.com',
          phone: '123-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=1'
        }
      },
      {
        id: 7,
        userId: 2,
        propertyId,
        rating: 3.9,
        review: 'Clean and cozy but small bathroom.',
        date: '2025-07-17',
        user: {
          id: 2,
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          phone: '987-654-3210',
          profilePicUrl: 'https://i.pravatar.cc/100?img=2'
        }
      },
      {
        id: 8,
        userId: 3,
        propertyId,
        rating: 4.6,
        review: 'Felt like a luxury stay, beautiful interior.',
        date: '2025-07-18',
        user: {
          id: 3,
          fname: 'Emma',
          lname: 'Brown',
          email: 'emma@example.com',
          phone: '321-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=3'
        }
      },
      {
        id: 9,
        userId: 4,
        propertyId,
        rating: 2.5,
        review: 'Too noisy at night, hard to sleep.',
        date: '2025-07-19',
        user: {
          id: 4,
          fname: 'Mike',
          lname: 'Wilson',
          email: 'mike@example.com',
          phone: '111-222-3333',
          profilePicUrl: 'https://i.pravatar.cc/100?img=4'
        }
      },
      {
        id: 10,
        userId: 5,
        propertyId,
        rating: 5.0,
        review: 'Best experience ever, highly recommended!',
        date: '2025-07-20',
        user: {
          id: 5,
          fname: 'Lisa',
          lname: 'White',
          email: 'lisa@example.com',
          phone: '444-555-6666',
          profilePicUrl: 'https://i.pravatar.cc/100?img=5'
        }
      },
      // Add reviews 11 to 25 below using the same format...
      {
        id: 11,
        userId: 1,
        propertyId,
        rating: 4.1,
        review: 'Good location, friendly host.',
        date: '2025-07-21',
        user: {
          id: 1,
          fname: 'Sarah',
          lname: 'Connor',
          email: 'sarah@example.com',
          phone: '123-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=1'
        }
      },
      {
        id: 12,
        userId: 2,
        propertyId,
        rating: 3.7,
        review: 'Could improve on amenities.',
        date: '2025-07-22',
        user: {
          id: 2,
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          phone: '987-654-3210',
          profilePicUrl: 'https://i.pravatar.cc/100?img=2'
        }
      },
      {
        id: 13,
        userId: 3,
        propertyId,
        rating: 4.3,
        review: 'Enjoyed the balcony view!',
        date: '2025-07-23',
        user: {
          id: 3,
          fname: 'Emma',
          lname: 'Brown',
          email: 'emma@example.com',
          phone: '321-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=3'
        }
      },
      {
        id: 14,
        userId: 4,
        propertyId,
        rating: 4.0,
        review: 'Clean, quiet and well-furnished.',
        date: '2025-07-24',
        user: {
          id: 4,
          fname: 'Mike',
          lname: 'Wilson',
          email: 'mike@example.com',
          phone: '111-222-3333',
          profilePicUrl: 'https://i.pravatar.cc/100?img=4'
        }
      },
      {
        id: 15,
        userId: 5,
        propertyId,
        rating: 4.9,
        review: 'Host went above and beyond!',
        date: '2025-07-25',
        user: {
          id: 5,
          fname: 'Lisa',
          lname: 'White',
          email: 'lisa@example.com',
          phone: '444-555-6666',
          profilePicUrl: 'https://i.pravatar.cc/100?img=5'
        }
      },
      {
        id: 16,
        userId: 1,
        propertyId,
        rating: 4.0,
        review: 'Very comfortable stay.',
        date: '2025-07-26',
        user: {
          id: 1,
          fname: 'Sarah',
          lname: 'Connor',
          email: 'sarah@example.com',
          phone: '123-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=1'
        }
      },
      {
        id: 17,
        userId: 2,
        propertyId,
        rating: 3.6,
        review: 'Could be cleaner.',
        date: '2025-07-27',
        user: {
          id: 2,
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          phone: '987-654-3210',
          profilePicUrl: 'https://i.pravatar.cc/100?img=2'
        }
      },
      {
        id: 18,
        userId: 3,
        propertyId,
        rating: 4.7,
        review: 'Spacious and modern!',
        date: '2025-07-28',
        user: {
          id: 3,
          fname: 'Emma',
          lname: 'Brown',
          email: 'emma@example.com',
          phone: '321-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=3'
        }
      },
      {
        id: 19,
        userId: 4,
        propertyId,
        rating: 4.1,
        review: 'Loved the kitchen setup!',
        date: '2025-07-29',
        user: {
          id: 4,
          fname: 'Mike',
          lname: 'Wilson',
          email: 'mike@example.com',
          phone: '111-222-3333',
          profilePicUrl: 'https://i.pravatar.cc/100?img=4'
        }
      },
      {
        id: 20,
        userId: 5,
        propertyId,
        rating: 5.0,
        review: 'Would book again for sure!',
        date: '2025-07-30',
        user: {
          id: 5,
          fname: 'Lisa',
          lname: 'White',
          email: 'lisa@example.com',
          phone: '444-555-6666',
          profilePicUrl: 'https://i.pravatar.cc/100?img=5'
        }
      },
      {
        id: 21,
        userId: 1,
        propertyId,
        rating: 3.9,
        review: 'Peaceful stay overall.',
        date: '2025-07-31',
        user: {
          id: 1,
          fname: 'Sarah',
          lname: 'Connor',
          email: 'sarah@example.com',
          phone: '123-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=1'
        }
      },
      {
        id: 22,
        userId: 2,
        propertyId,
        rating: 3.4,
        review: 'Basic amenities were missing.',
        date: '2025-08-01',
        user: {
          id: 2,
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          phone: '987-654-3210',
          profilePicUrl: 'https://i.pravatar.cc/100?img=2'
        }
      },
      {
        id: 23,
        userId: 3,
        propertyId,
        rating: 4.4,
        review: 'Great for families!',
        date: '2025-08-02',
        user: {
          id: 3,
          fname: 'Emma',
          lname: 'Brown',
          email: 'emma@example.com',
          phone: '321-456-7890',
          profilePicUrl: 'https://i.pravatar.cc/100?img=3'
        }
      },
      {
        id: 24,
        userId: 4,
        propertyId,
        rating: 4.2,
        review: 'Stylish and comfortable.',
        date: '2025-08-03',
        user: {
          id: 4,
          fname: 'Mike',
          lname: 'Wilson',
          email: 'mike@example.com',
          phone: '111-222-3333',
          profilePicUrl: 'https://i.pravatar.cc/100?img=4'
        }
      },
      {
        id: 25,
        userId: 5,
        propertyId,
        rating: 4.9,
        review: 'My new favorite place to stay.',
        date: '2025-08-04',
        user: {
          id: 5,
          fname: 'Lisa',
          lname: 'White',
          email: 'lisa@example.com',
          phone: '444-555-6666',
          profilePicUrl: 'https://i.pravatar.cc/100?img=5'
        }
      }
    ];
  }
}
