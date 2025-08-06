import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopProperty } from '../../interfaces/dashboard/top-property.model';

@Injectable({ providedIn: 'root' })
export class TopPropertyService {
  private apiUrl = 'https://localhost:7279/api/dashboard/topproperties';

  constructor(private http: HttpClient) {}

  getTopProperties(): Observable<TopProperty[]> {
    return this.http.get<TopProperty[]>(this.apiUrl);
  }
}
