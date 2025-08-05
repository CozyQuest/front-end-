import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RevenueData } from '../../interfaces/dashboard/revenue-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private apiUrl = 'https://localhost:7279/api/dashboard/revenue';

  constructor(private http: HttpClient) {}

  getRevenueData(period: string = 'Y'): Observable<RevenueData> {
    return this.http.get<RevenueData>(`${this.apiUrl}?period=${period}`);
  }
}
