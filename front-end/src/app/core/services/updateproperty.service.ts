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
      if (key === 'Images' && value && Array.isArray(value)) {
        // Handle multiple images
        console.log('📤 Adding Images to FormData:', (value as File[]).length, 'files');
        (value as File[]).forEach(img => {
          formData.append('Images', img);
        });
      } else if (key === 'ServiceIds' && value && Array.isArray(value)) {
        // Handle service IDs array
        (value as number[]).forEach(id => formData.append('ServiceIds', id.toString()));
      } else if (key === 'ImageUrlsToRemove' && value && Array.isArray(value)) {
        // Handle image URLs to remove
        (value as string[]).forEach(url => formData.append('ImageUrlsToRemove', url));
      } else if (key === 'MainImage' && value) {
        // Handle main image file
        console.log('📤 Adding MainImage to FormData:', (value as File).name);
        formData.append('MainImage', value as File);
      } else if (value !== null && value !== undefined && 
                 key !== 'Images' && key !== 'ServiceIds' && key !== 'MainImage' && key !== 'ImageUrlsToRemove') {
        // Handle all other properties (including MainImageUrl)
        formData.append(key, value.toString());
      }
    });

    return formData;
  }
}