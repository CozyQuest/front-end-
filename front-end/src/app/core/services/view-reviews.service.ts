// src/app/core/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewReview } from '../interfaces/ViewReviews';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewReviewService {
  private baseUrl = 'https://localhost:7279/api';

  constructor(private http: HttpClient) {}

  getReviewsForProperty(propertyId: number): Observable<ViewReview[]> {
    return this.http.get<ViewReview[]>(`${this.baseUrl}/Reviews/${propertyId}`);
  }
}
