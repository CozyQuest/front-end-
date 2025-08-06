import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BecomeHostResponse, BecomeHostCheckResponse, BecomeHostErrorResponse } from '../interfaces/become-host.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BecomeHostService {
  private readonly baseUrl = environment.apiUrl || 'https://localhost:7279';
  private readonly submitEndpoint = '/api/User/BecomeHostRequest/';
  private readonly checkEndpoint = '/api/User/CheckBecomeHostRequest/';

  constructor(private http: HttpClient) {}

  /**
   * Check if user has already submitted a become host request
   * No data needed - uses authorization token from interceptor
   * @returns Observable of the check response
   */
  checkBecomeHostRequest(): Observable<BecomeHostCheckResponse> {
    return this.http.get<BecomeHostCheckResponse>(`${this.baseUrl}${this.checkEndpoint}`, {
      headers: {
        'accept': '*/*'
      }
    }).pipe(
      map(response => response),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Submit become host request with front and back ID images
   * @param frontImage - Front side of ID document
   * @param backImage - Back side of ID document
   * @returns Observable of the API response
   */
  submitBecomeHostRequest(frontImage: File, backImage: File): Observable<BecomeHostResponse> {
    const formData = new FormData();
    formData.append('frontImage', frontImage, frontImage.name);
    formData.append('backImage', backImage, backImage.name);

    return this.http.post<BecomeHostResponse>(`${this.baseUrl}${this.submitEndpoint}`, formData, {
      headers: {
        'accept': '*/*'
        // Note: Don't set Content-Type for FormData - Angular sets it automatically with boundary
      }
    }).pipe(
      map(response => response),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Handle HTTP errors and extract meaningful error messages
   * @param error - HTTP error response
   * @returns Observable error with processed message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.status === 401) {
      errorMessage = 'You must be logged in to submit a host application.';
    } else if (error.error) {
      // Extract error message from backend response
      const backendError = error.error as BecomeHostErrorResponse;
      errorMessage = backendError.respond ||
                    backendError.message ||
                    backendError.title ||
                    backendError.detail ||
                    backendError.Message ||
                    backendError.errors?.[0]?.message ||
                    (typeof error.error === 'string' ? error.error : '');
    }

    if (!errorMessage) {
      errorMessage = error.message ||
                    error.statusText ||
                    'Failed to submit application. Please try again.';
    }

    console.error('BecomeHost API Error:', error);
    console.log('Full error structure:', JSON.stringify(error, null, 2));

    return throwError(() => ({
      message: errorMessage,
      status: error.status,
      error: error.error
    }));
  }
}