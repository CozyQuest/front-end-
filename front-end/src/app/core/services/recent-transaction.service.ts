import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecentTransaction } from '../interfaces/recent-transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentTransactionService {
  private baseUrl = 'https://localhost:7279/api/dashboard/recenttransactions';

  constructor(private http: HttpClient) {}

  getRecentTransactions(): Observable<RecentTransaction[]> {
    return this.http.get<RecentTransaction[]>(`${this.baseUrl}`);
  }
}
