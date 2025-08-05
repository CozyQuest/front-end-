import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostEarnings } from '../interfaces/hostEarning.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RentingHistoryService {
  private baseUrl = 'https://localhost:7279'; 

  constructor(private http: HttpClient) {}

  getHostEarnings(hostId: string): Promise<HostEarnings> {
    if (!hostId) {
      return Promise.reject('No hostId provided to getHostEarnings');
    }

    const url = `${this.baseUrl}/EarningDashboard/${hostId}`;
    return firstValueFrom(this.http.get<HostEarnings>(url));
  }
}
