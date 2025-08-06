import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPropertyCard } from '../interfaces/recomendedProperty';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeTopRatedPropertyService {
  private readonly apiUrl = 'https://localhost:7279/api/property/top-rated';

  constructor(private http: HttpClient) {}

  getTopRatedProperties(): Observable<IPropertyCard[]> {
    return this.http.get<IPropertyCard[]>(this.apiUrl);
  }
}
