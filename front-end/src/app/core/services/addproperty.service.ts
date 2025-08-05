import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPropertyRequest } from '../interfaces/AddPropertyDTO';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
private baseUrl = 'https://localhost:7279'; // your API base URL

  constructor(private http: HttpClient) {}

  addProperty(property: AddPropertyRequest): Observable<any> {
    const formData = new FormData();

    Object.entries(property).forEach(([key, value]) => {
      if (key === 'Images') {
        (value as File[]).forEach(img => formData.append('Images', img));
      } else if (key === 'ServiceIds') {
        (value as number[]).forEach(id => formData.append('ServiceIds', id.toString()));
      } else if (key === 'MainImage' && value) {
        formData.append('MainImage', value as File);
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    return this.http.post(`${this.baseUrl}/AddProperty`, formData);
  }
}
