import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../interfaces/Property';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwnedProperty } from '../interfaces/ownedProperty.model';

@Injectable({ providedIn: 'root' })
export class OwnedPropertiesService {
  private baseUrl = 'https://localhost:7279'; 

  constructor(private http: HttpClient) {}

  getOwnedProperties(userId: string): Observable<OwnedProperty[]> {
     console.log('🔁 Calling backend to get owned properties for user:', userId);
    return this.http.get<OwnedProperty[]>(`${this.baseUrl}/owned-properties/${userId}`);
  }
}
