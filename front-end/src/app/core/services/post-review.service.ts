import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PostRate } from '../interfaces/postRate';
import { PostReview } from '../interfaces/postReview';

@Injectable({ providedIn: 'root' })
export class PostReviewService {
  private baseUrl = 'https://localhost:7279';

  constructor(private http: HttpClient) {}

  postRating(propertyId: string, rating: PostRate): Observable<any> {
  return this.http.post(`${this.baseUrl}/PostRating/${propertyId}`, rating);
 }

 postReview(propertyId: string, review: PostReview): Observable<any> {
   return this.http.post(`${this.baseUrl}/PostReview/${propertyId}`, review);
 }


}