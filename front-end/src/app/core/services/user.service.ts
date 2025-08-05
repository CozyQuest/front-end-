import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { UserPublicProfile } from '../interfaces/UserPublicProfile';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  // Ensure this matches your backend API URL
  private apiUrl = "https://localhost:7279/api";

  // The local `users` array is for demonstration, and won't be used for the backend call
  private users: User[] = [
    { id: "1", fname: 'SNDY', lname: 'kamal', email: 'sarah@example.com', phone: '123-456-7890', profilePicUrl: 'https://i.pravatar.cc/100?img=1', location: "Alexandria,Egypt" },
    { id: "2", fname: 'John', lname: 'Doe', email: 'john@example.com', phone: '987-654-3210', profilePicUrl: 'https://i.pravatar.cc/100?img=2', location: "Alexandria,Egypt" },
    { id: "3", fname: 'Jane', lname: 'Smith', email: 'jane@example.com', phone: '456-123-7890', profilePicUrl: 'https://i.pravatar.cc/100?img=3', location: "Alexandria,Egypt" },
    { id: "4", fname: 'Mike', lname: 'Johnson', email: 'mike@example.com', phone: '321-654-9870', profilePicUrl: 'https://i.pravatar.cc/100?img=4', location: "Alexandria,Egypt" },
    { id: "5", fname: 'Emma', lname: 'Brown', email: 'emma@example.com', phone: '654-987-1230', profilePicUrl: 'https://i.pravatar.cc/100?img=5', location: "Alexandria,Egypt" }
  ];

  getFullUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getPrivateProfile(): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.apiUrl}/user/profile`));
  }
}