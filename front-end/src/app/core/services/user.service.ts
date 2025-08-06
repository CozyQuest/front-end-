import { Injectable } from '@angular/core';
import { UserPrivateProfile } from '../interfaces/UserPrivateProfile.model';
import { UserPublicProfile } from '../interfaces/UserPublicProfile';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = "https://localhost:7279/api";

  getPrivateProfile(): Promise<UserPrivateProfile> {
    return firstValueFrom(this.http.get<UserPrivateProfile>(`${this.apiUrl}/user/profile`));
  }

   getPublicProfile(userId: string): Observable<UserPublicProfile> {
      return this.http.get<UserPublicProfile>(`${this.apiUrl}/user/profile/${userId}`);
  }
}