import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

// Global state for refresh token handling
let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  // Skip in non-browser or for auth endpoints
  if (!isPlatformBrowser(platformId) ||
      req.url.includes('/login') ||
      req.url.includes('/register') ||
      req.url.includes('/refresh')) {
    return next(req);
  }

  // // Special handling for dummy endpoint
  // if (req.url.includes('/api/dummy')) {
  //   const modifiedReq = req.clone({
  //     headers: req.headers.set('Content-Type', 'application/json')
  //   });
  //   return executeRequest(modifiedReq, next, authService);
  // }

  // Default handling
  return executeRequest(req, next, authService);
};

function executeRequest(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  const authReq = addTokenHeader(req, authService.getAccessToken());
  return next(authReq).pipe(
    catchError((error) => handleError(error, req, next, authService))
  );
}

function addTokenHeader(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
  if (!token) return request;

  const headers = request.headers.keys().reduce((acc, key) => {
    acc[key] = request.headers.get(key);
    return acc;
  }, {} as { [key: string]: string | null });

  return request.clone({
    setHeaders: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  });
}

function handleError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  if (error.status === 401 && authService.getRefreshToken()) {
    return handle401Error(req, next, authService);
  }
  if (error.status === 401) {
    authService.logout();
  }
  return throwError(() => error);
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap(({ accessToken }) => {
        isRefreshing = false;
        refreshTokenSubject.next(accessToken);
        return next(addTokenHeader(request, accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap((token) => next(addTokenHeader(request, token!)))
  );
}
