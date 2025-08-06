import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface UserProfile {
   firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  website?: string;
  profileImage?: string;
  location?: string;      
  birthday?: string;       
  language?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7279'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    // return this.http.get<UserProfile>(`${this.baseUrl}/profile`);

    // 🔧 Mocked data for development (remove later)
    return of({
      firstName: 'Nancy',
      lastName: 'El Sherbiny',
      email: 'nancy@example.com',
      occupation: 'Developer',
      description: 'Passionate about software.',
      phone: '0123456789',
      website: 'https://nancy.dev',
      profileImage: ''
    });
  }

  updateUserProfile(data: UserProfile): Observable<any> {
    // return this.http.put(`${this.baseUrl}/profile`, data);

    // 🔧 Mocked response for development
    console.log('Mock update user profile', data);
    return of({ success: true });
  }

  changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/api/Password/update-password`, {
    currentPassword,
    newPassword,
    confirmPassword
  });
}

  deleteAccount(): Observable<any> {
    // return this.http.delete(`${this.baseUrl}/delete`);

    // 🔧 Mocked response for development
    console.log('Mock delete account');
    return of({ success: true });
  }
}
