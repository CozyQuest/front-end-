import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrl: './test.css'
})
export class Test implements OnInit {
  public logs: string[] = [];
  public currentToken: string | null = null;
  public isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateAuthStatus();

    // Subscribe to auth changes
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      this.updateAuthStatus();
    });
  }

  updateAuthStatus() {
    this.currentToken = this.authService.getAccessToken();
    this.addLog(`Current token: ${this.currentToken ? 'EXISTS' : 'NONE'}`);
  }

  addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.unshift(`[${timestamp}] ${message}`);
    console.log(message);
  }

  clearLogs() {
    this.logs = [];
  }

  // Test 1: Request that SHOULD get Authorization header (interceptor should work)
  testProtectedRequest() {
    this.addLog('🧪 Testing PROTECTED request (should add Authorization header)...');

    this.http.post('https://localhost:7279/api/dummy', JSON.stringify("test data"), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        this.addLog('✅ Protected request SUCCESS: ' + response);
      },
      error: (err) => {
        this.addLog('❌ Protected request ERROR: ' + err.status + ' - ' + err.message);
      }
    });
  }

  // Test 2: Login request (interceptor should SKIP this)
  testLoginRequest() {
    this.addLog('🧪 Testing LOGIN request (interceptor should SKIP)...');

    const loginData = {
      email: 'ahmed@gmail.com',
      password: 'Aa@12345',
      rememberMe: false
    };

    this.http.post('https://localhost:7279/login', loginData).subscribe({
      next: (response) => {
        this.addLog('✅ Login request SUCCESS (no auth header added)');
      },
      error: (err) => {
        this.addLog('❌ Login request ERROR: ' + err.status + ' - ' + err.message);
      }
    });
  }

  // Test 3: Request to trigger 401 (test token refresh)
  testUnauthorizedRequest() {
    this.addLog('🧪 Testing request that might return 401...');

    this.http.get('https://localhost:7279/api/protected-endpoint').subscribe({
      next: (response) => {
        this.addLog('✅ Authorized request SUCCESS');
      },
      error: (err) => {
        if (err.status === 401) {
          this.addLog('🔄 Got 401 - Interceptor should handle token refresh');
        } else {
          this.addLog('❌ Request ERROR: ' + err.status + ' - ' + err.message);
        }
      }
    });
  }

  // Test 4: Multiple simultaneous requests
  testMultipleRequests() {
    this.addLog('🧪 Testing MULTIPLE simultaneous requests...');

    for (let i = 1; i <= 3; i++) {
      this.http.post(`https://localhost:7279/api/dummy`, JSON.stringify(`Request ${i}`), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'text'
      }).subscribe({
        next: (response) => {
          this.addLog(`✅ Request ${i} SUCCESS: ${response}`);
        },
        error: (err) => {
          this.addLog(`❌ Request ${i} ERROR: ${err.status}`);
        }
      });
    }
  }

  // Test 5: Request with custom headers (interceptor should preserve them)
  testCustomHeaders() {
    this.addLog('🧪 Testing request with CUSTOM headers...');

    this.http.post('https://localhost:7279/api/dummy', JSON.stringify("custom header test"), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Custom-Header': 'MyCustomValue',
        'X-Request-ID': '12345'
      }),
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        this.addLog('✅ Custom headers request SUCCESS');
      },
      error: (err) => {
        this.addLog('❌ Custom headers request ERROR: ' + err.status);
      }
    });
  }

  // Mock login for testing
  mockLogin() {
    this.addLog('🔐 Performing mock login...');

    // Using your real token from the curl command
    const realToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWhtZWRAZ21haWwuY29tIiwianRpIjoiM2YxMGUwYjQtMTVhYS00MmVjLTg1ZGItNWEyMGU5ZGNkOWFmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI4ZTljN2QzNi0wODhjLTRiNTYtYTJiNi0xZmJmOTk1OTdjZTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNzU0MDEzNzAzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3Mjc5In0.wW9Uv_5ywErIjai8Ovts1vfeuFO9YpuweM_hjWRhw1Y';

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('access_token', realToken);
      this.updateAuthStatus();
      this.addLog('✅ Real token set in localStorage (from your curl command)');
    }
  }

  logout() {
    this.addLog('🚪 Logging out...');
    this.authService.logout();
    this.updateAuthStatus();
  }
}
