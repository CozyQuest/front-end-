import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertyCheckoutInterface } from '../interfaces/property-checkout';
import { RentingCheckoutInterface } from '../interfaces/renting-checkout-interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyCheckoutService {
  private apiUrl = 'https://localhost:7279/api/Checkout';

  constructor(private http: HttpClient) {}

  getPropertyCheckout(id: number) {
    return this.http.get<PropertyCheckoutInterface>(`${this.apiUrl}/${id}`);
  }

  createStripeSession(checkoutData: RentingCheckoutInterface) {
    return this.http.post<{ checkoutUrl: string }>(`${this.apiUrl}`, checkoutData);
  }
}
