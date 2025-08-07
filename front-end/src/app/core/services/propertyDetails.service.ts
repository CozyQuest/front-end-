import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { properties } from '../interfaces/propertyDetails';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'https://localhost:7279/api/Property';

  constructor(private http: HttpClient) {}

  getPropertyById(id: number): Observable<properties> {
    return this.http.get<properties>(`${this.baseUrl}/${id}`);
  }

  getAverageRating(propertyId: number) {
  return this.http.get<{ averageRating: number }>(`https://localhost:7279/average-rating/${propertyId}`);
}
}
