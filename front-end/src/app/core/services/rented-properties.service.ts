import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RentedProperty } from '../interfaces/RentedProperty';

@Injectable({ providedIn: 'root' })
export class RentedPropertiesService {
    private baseUrl = 'https://localhost:7279'; 

  constructor(private http: HttpClient) {}
  getRentedPropertiesByUser(userId: string): Observable<RentedProperty[]> {
  return this.http.get<any[]>(`${this.baseUrl}/RentedProperties/${userId}`).pipe(
    map(data => data.map(item => ({
      propertyId: item.propertyId,
      title: item.title,
      mainImageUrl: item.mainImageUrl,
      rate: item.rate,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      totalPrice: item.totalPrice
    })))
  );
}
}