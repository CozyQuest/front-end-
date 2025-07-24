import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertyCheckoutInterface } from '../interfaces/property-checkout';

@Injectable({
  providedIn: 'root'
})
export class PropertyCheckoutService {
  private apiUrl = 'https://localhost:7135/api/Checkout';

  constructor(private http: HttpClient) {}

  getPropertyCheckout(id: number) {
    return this.http.get<PropertyCheckoutInterface>(`${this.apiUrl}/${id}`);
  }
}
