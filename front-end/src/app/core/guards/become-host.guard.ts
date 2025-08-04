import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BecomeHostService } from '../services/become-host.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BecomeHostGuard implements CanActivate {
  constructor(
    private becomeHostService: BecomeHostService, 
    private router: Router
  ) {}

  /**
   * CAN ACTIVATE METHOD FOR BECOME HOST ROUTE
   * Checks if user has already submitted a become host request based on HTTP status codes:
   * - 200: User hasn't submitted a request yet → allow access
   * - 400: User already submitted a request → redirect to review page
   * - Other errors: Allow access as fallback
   */
  canActivate(): Observable<boolean | UrlTree> {
    return this.becomeHostService.checkBecomeHostRequest().pipe(
      map(response => {
        // 200 response means user hasn't submitted a request yet
        // Allow access to become host form
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          // 400 means user already has a pending request
          console.log('User already has a pending become host request, redirecting to review page');
          return of(this.router.createUrlTree(['/submission-under-review']));
        }
        
        // For other errors (network issues, 401, 500, etc.), allow access as fallback
        console.warn('Failed to check become host status, allowing access:', error);
        return of(true);
      })
    );
  }
}