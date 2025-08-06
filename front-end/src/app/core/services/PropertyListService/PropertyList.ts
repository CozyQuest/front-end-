import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PropertyListService {
  private typeApiUrl = 'https://localhost:7279/api/Type';
  private servicesApiUrl = 'https://localhost:7279/api/Services';
  private locationApiUrl = 'https://localhost:7279/api/Location';
  private propertiesApiUrl = 'https://localhost:7279/api/Property/all';
  private filterApiUrl = 'https://localhost:7279/api/Property/filter';

  constructor(private http: HttpClient) {}

  getPropertyTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.typeApiUrl);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.servicesApiUrl);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.locationApiUrl);
  }

  getAllProperties(): Observable<any[]> {
    return this.http.get<any[]>(this.propertiesApiUrl);
  }

  filterProperties(filterParams: any): Observable<any[]> {
    return this.http.post<any[]>(this.filterApiUrl, filterParams);
  }
}
