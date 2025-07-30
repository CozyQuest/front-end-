import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Prevents multiple simultaneous refresh attempts
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  /**
   * INTERCEPT METHOD
   * This runs on EVERY HTTP request your app makes
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth header for login, register and refresh endpoints
    if (req.url.includes('/login') || req.url.includes('/register') || req.url.includes('/refresh')) {
      return next.handle(req);
    }

    // Add auth header if we have a token
    const authReq = this.addTokenHeader(req, this.authService.getAccessToken());

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401 && this.authService.getRefreshToken()) {
          return this.handle401Error(authReq, next);
        }
        
        // If 401 and no refresh token, logout
        if (error.status === 401) {
          this.authService.logout();
        }
        
        return throwError(() => error);
      })
    );
  }

  /**
   * ADD TOKEN TO REQUEST HEADER
   */
  private addTokenHeader(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  /**
   * HANDLE 401 ERRORS WITH TOKEN REFRESH
   * This automatically tries to refresh the token when it expires
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.accessToken);
          
          // Retry the original request with new token
          return next.handle(this.addTokenHeader(request, response.accessToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout(); // Refresh failed, logout user
          return throwError(() => error);
        })
      );
    }

    // If already refreshing, wait for the refresh to complete
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
}