import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Apartment } from '../interfaces/apartment.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnedPropertyService {
  private readonly baseUrl = environment.apiUrl || 'https://localhost:7279';
  private readonly ownedPropertiesEndpoint = '/owned-properties';

  constructor(private http: HttpClient) {}

  /**
   * Get owned properties with pagination
   * Uses authorization token from interceptor
   * @param pageNumber - Page number (default: 1)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Observable of owned properties array
   */
  getOwnedProperties(pageNumber: number = 1, pageSize: number = 10): Observable<Apartment[]> {
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    return this.http.get<Apartment[]>(`${this.baseUrl}${this.ownedPropertiesEndpoint}`, {
      params,
      headers: {
        'accept': '*/*'
      }
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Handle HTTP errors
   * @param error - The HTTP error response
   * @returns Observable that throws formatted error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      
      if (error.error && typeof error.error === 'string') {
        errorMessage += ` - ${error.error}`;
      } else if (error.error && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }
    
    console.error('OwnedPropertyService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}