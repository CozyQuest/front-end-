import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesSource } from '../interfaces/sales-source.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesBreakdownService {
  private apiUrl = 'https://localhost:7279/api/dashboard/salesbreakdown';

  constructor(private http: HttpClient) {}

  getBreakdown(period: string = 'Y'): Observable<SalesSource[]> {
    return this.http.get<SalesSource[]>(`${this.apiUrl}?period=${period}`);
  }
}
