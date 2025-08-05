import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PendingProperty } from '../../interfaces/dashboard/pending-property.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PendingRequestsService {
  private readonly baseUrl = 'https://localhost:7279/api/dashboard/pendingrequests';

  constructor(private http: HttpClient) { }

  getPendingRequests(): Observable<PendingProperty[]> {
    return this.http.get<PendingProperty[]>(`${this.baseUrl}`);
  }

  approveRequest(id: number) {
    return this.http.put<void>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectRequest(id: number) {
    return this.http.put<void>(`${this.baseUrl}/${id}/reject`, {});
  }
}
