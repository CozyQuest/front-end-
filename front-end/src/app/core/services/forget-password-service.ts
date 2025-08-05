import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private baseUrl = 'https://localhost:7279';

  constructor(private http: HttpClient) {}

  resetPassword(email: string, newPassword: string, confirmPassword: string): Observable<any> {
  const body = { email, newPassword, confirmPassword };
  return this.http.put(`${this.baseUrl}/api/Password/forget-password`, body);
  }
}
