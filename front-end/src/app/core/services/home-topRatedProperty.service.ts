import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPropertyCard } from '../interfaces/recomendedProperty';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HomeTopRatedPropertyService {
  private readonly apiUrl = environment.apiUrl+'/api/property/top-rated';

  constructor(private http: HttpClient) {}

  getTopRatedProperties(): Observable<IPropertyCard[]> {
    return this.http.get<IPropertyCard[]>(this.apiUrl);
  }
}
