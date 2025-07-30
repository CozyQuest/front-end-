import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// Define the structure of register request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

// Define the structure of login request
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Define the structure of your API's auth response
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
}

// Define the decoded JWT token structure
export interface DecodedToken {
  name: string;
  jti: string;
  nameidentifier: string;
  role: string;
  exp: number;
  iss: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Keys for localStorage
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'current_user';
  private baseUrl = 'https://localhost:7279'; // Your API base URL
  
  // Observable streams for reactive UI updates
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<DecodedToken | null>(null);

  // Public observables that components can subscribe to
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only initialize with stored data if we're in the browser
    if (this.isBrowser()) {
      this.isAuthenticatedSubject.next(this.hasValidToken());
      this.currentUserSubject.next(this.getCurrentUser());
    }
  }

  /**
   * Check if we're running in a browser environment
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * REGISTER METHOD
   * Creates a new user account
   */
  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  /**
   * LOGIN METHOD
   * Sends credentials to your API and handles the response
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.accessToken) {
            // Store tokens in localStorage
            this.setTokens(response);
            
            // Decode the JWT token to get user info
            const decodedUser = this.decodeToken(response.accessToken);
            this.setCurrentUser(decodedUser);
            
            // Update observable streams to notify UI
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(decodedUser);
          }
        })
      );
  }

  /**
   * TOKEN REFRESH METHOD
   * Uses refresh token to get a new access token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/refresh`, {
      refreshToken: refreshToken
    }).pipe(
      tap(response => {
        if (response.accessToken) {
          this.setTokens(response);
          const decodedUser = this.decodeToken(response.accessToken);
          this.setCurrentUser(decodedUser);
          this.currentUserSubject.next(decodedUser);
        }
      })
    );
  }

  /**
   * LOGOUT METHOD
   * Clears all stored data and redirects to login
   */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.accessTokenKey);
      localStorage.removeItem(this.refreshTokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * TOKEN GETTER METHODS
   */
  getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * TOKEN SETTER METHOD
   * Stores both tokens from API response
   */
  setTokens(authResponse: AuthResponse): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.accessTokenKey, authResponse.accessToken);
      localStorage.setItem(this.refreshTokenKey, authResponse.refreshToken);
    }
  }

  /**
   * AUTHENTICATION CHECK
   * Returns true if user has a valid token
   */
  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  /**
   * TOKEN VALIDATION
   * Checks if the current token is valid and not expired
   */
  hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    
    try {
      const decoded = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime; // Check if token is not expired
    } catch {
      return false;
    }
  }

  /**
   * GET CURRENT USER
   * Returns the decoded user information
   */
  getCurrentUser(): DecodedToken | null {
    if (!this.isBrowser()) return null;
    
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    
    // If no stored user but we have a valid token, decode it
    const token = this.getAccessToken();
    if (token && this.hasValidToken()) {
      const decoded = this.decodeToken(token);
      this.setCurrentUser(decoded);
      return decoded;
    }
    
    return null;
  }

  /**
   * STORE USER INFO
   */
  private setCurrentUser(user: DecodedToken): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  /**
   * JWT TOKEN DECODER
   * Decodes the JWT token and extracts user information
   */
  private decodeToken(token: string): DecodedToken {
    try {
      // JWT has 3 parts separated by dots: header.payload.signature
      const payload = token.split('.')[1];
      
      // Decode base64 payload
      const decoded = JSON.parse(atob(payload));
      
      // Map the Microsoft claims to a cleaner format
      return {
        name: decoded.name,
        jti: decoded.jti,
        nameidentifier: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        exp: decoded.exp,
        iss: decoded.iss
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * ROLE MANAGEMENT METHODS
   */
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }
}