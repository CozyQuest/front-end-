import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { PropertyFilterResponse, PropertyType, Service } from './property-filter.model';
import { PropertyFilterRequest } from './property-filter.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyListService {
  private baseUrl = 'https://localhost:7279/api'; // Update as needed

  constructor(private http: HttpClient) {
    console.log('PropertyListService initialized with baseUrl:', this.baseUrl);
  }

  getLocations(): Observable<any> {
    console.log('Calling getLocations...');
    return this.http.get(`${this.baseUrl}/Property/Location`).pipe(
      tap(response => console.log('Locations response:', response)),
      catchError(error => {
        console.error('Error fetching locations:', error);
        throw error;
      })
    );
  }

  getPropertyTypes(): Observable<PropertyType[]> {
    console.log('Calling getPropertyTypes...');
    return this.http.get<PropertyType[]>(`${this.baseUrl}/Property/PropertyTypes`).pipe(
      tap(response => console.log('PropertyTypes response:', response)),
      catchError(error => {
        console.error('Error fetching property types:', error);
        throw error;
      })
    );
  }

  getServices(): Observable<Service[]> {
    console.log('Calling getServices...');
    return this.http.get<Service[]>(`${this.baseUrl}/Property/Services`).pipe(
      tap(response => console.log('Services response:', response)),
      catchError(error => {
        console.error('Error fetching services:', error);
        throw error;
      })
    );
  }

  getFilteredProperties(filter: PropertyFilterRequest): Observable<PropertyFilterResponse> {
    console.log('Calling getFilteredProperties with filter:', filter);
    const requestPayload = {
      ...filter,
      PageNumber: filter.PageNumber || 1,
      PageSize: filter.PageSize || 10,
      propertyTypeIds: filter.propertyTypeIds || [],
      serviceIds: filter.serviceIds || []
    };

    console.log('Making POST request to:', `${this.baseUrl}/Property/filter`);
    console.log('Request payload:', requestPayload);

    return this.http.post<PropertyFilterResponse>(`${this.baseUrl}/Property/filter`, requestPayload).pipe(
      tap(response => console.log('Filter response:', response)),
      catchError(error => {
        console.error('Error fetching filtered properties:', error);
        throw error;
      })
    );
  }
}
