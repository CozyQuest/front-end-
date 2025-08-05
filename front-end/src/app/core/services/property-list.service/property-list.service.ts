import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyListService {
  private baseUrl = 'https://localhost:5001/api'; // Update as needed

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Location`);
  }

    getFilteredProperties(filter: any): Observable<any> {
    const requestPayload = {
        ...filter,
        PageNumber: filter.PageNumber || 1,
        PageSize: filter.PageSize || 10,
        PropertyTypeIds: filter.propertyTypeId ? [filter.propertyTypeId] : undefined,
    };

    return this.http.post(`${this.baseUrl}/Property/filter`, requestPayload);
    }

}
