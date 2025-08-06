import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stat } from '../../interfaces/dashboard/stat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private apiUrl = 'https://localhost:7279/api/dashboard/stats';

  constructor(private http: HttpClient) {}

  getStats(): Observable<Stat[]> {
    return this.http.get<Stat[]>(this.apiUrl);
  }
}
