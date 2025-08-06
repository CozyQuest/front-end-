import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPropertyRequest } from '../interfaces/AddPropertyDTO';
import { PropertyResponse } from '../interfaces/getProperty';

@Injectable({
  providedIn: 'root'
})
export class UpdatePropertyService {
  private baseUrl = 'https://localhost:7279';

  constructor(private http: HttpClient) {}

  // Get existing property data for editing
  getProperty(id: number): Observable<PropertyResponse> {
    return this.http.get<PropertyResponse>(`${this.baseUrl}/api/Property/${id}`);
  }

  // Update property with the same request structure as AddProperty
  updateProperty(id: number, property: AddPropertyRequest): Observable<any> {
    const formData = this.createFormData(property);
    return this.http.put(`${this.baseUrl}/UpdateProperty/${id}`, formData);
  }

  // Helper method to create FormData from property object
  private createFormData(property: AddPropertyRequest): FormData {
    const formData = new FormData();

    Object.entries(property).forEach(([key, value]) => {
      if (key === 'Images') {
        // Handle multiple images
        (value as File[]).forEach(img => formData.append('Images', img));
      } else if (key === 'ServiceIds') {
        // Handle service IDs array
        (value as number[]).forEach(id => formData.append('ServiceIds', id.toString()));
      } else if (key === 'MainImage' && value) {
        // Handle main image file
        formData.append('MainImage', value as File);
      } else if (value !== null && value !== undefined) {
        // Handle all other properties
        formData.append(key, value.toString());
      }
    });

    return formData;
  }
}