import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserHostRequest } from '../../interfaces/dashboard/user-host-request.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserHostRequestsService {
  private readonly baseUrl = 'https://localhost:7279/api/User';

  constructor(private http: HttpClient) {}

  getUserHostRequests(): Observable<UserHostRequest[]> {
    return this.http.post<UserHostRequest[]>(`${this.baseUrl}/UserHostList`, {});
  }

  approveRequest(userId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/ConvertToHost/${userId}`, {});
  }

  rejectRequest(userId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/DenyConvertToHost/${userId}`, {});
  }
}
