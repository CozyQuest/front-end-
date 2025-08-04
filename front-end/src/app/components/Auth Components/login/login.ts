import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

// Google Identity Services types
declare const google: any;

@Component({
  selector: 'app-login-button',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
forgetPass() {
this.router.navigate(['/forget-pass']);
}
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      rememberMe: [false] // Add rememberMe field
    });
  }

  ngOnInit() {
    console.log('Login component initialized');
    // Initialize Google Sign-In only on browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleSignIn();
    } else {
      console.log('Not in browser, skipping Google Sign-In initialization');
    }
  }

  private initializeGoogleSignIn() {
    console.log('Initializing Google Sign-In...');
    console.log('Google Client ID:', environment.googleClientId);
    
    // Check if Google Client ID is properly configured
    if (!environment.googleClientId || environment.googleClientId === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
      console.error('Google Client ID not configured properly in environment');
      return;
    }

    // Wait for Google script to load
    if (typeof google !== 'undefined') {
      console.log('Google script found, initializing...');
      try {
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (response: any) => this.handleGoogleSignIn(response),
          auto_select: false,
          cancel_on_tap_outside: true
        });
        console.log('Google Sign-In initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    } else {
      console.log('Google script not loaded yet, retrying...');
      // If Google script hasn't loaded yet, try again after a short delay
      setTimeout(() => this.initializeGoogleSignIn(), 500);
    }
  }

  private handleGoogleSignIn(response: any) {
    if (response.credential) {
      this.isLoading = true;
      this.errorMessage = '';

      // Send the Google ID token to your backend with RememberMe preference
      this.authService.googleAuth({ 
        idToken: response.credential,
        rememberMe: this.loginForm.value.rememberMe || false 
      }).subscribe({
        next: (authResponse) => {
          this.isLoading = false;
          console.log('Google login successful:', authResponse);

          // Redirect based on user role
          const user = this.authService.getCurrentUser();
          if (user?.role === 'Admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Google authentication failed';
          console.error('Google login error:', error);
        }
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Call the auth service login method with correct format
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login successful:', response);

        // Redirect based on user role
        const user = this.authService.getCurrentUser();
        if (user?.role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', error);
      }
    });
  }

  loginWithGoogle() {
    console.log('Google button clicked!');
    
    if (!isPlatformBrowser(this.platformId)) {
      console.error('Not running in browser');
      return;
    }

    if (typeof google === 'undefined') {
      console.error('Google script not loaded. Checking environment...');
      console.log('Google Client ID:', environment.googleClientId);
      alert('Google Sign-In is not properly configured. Please check the console for details.');
      return;
    }

    console.log('Google script loaded, triggering sign-in...');
    try {
      // Trigger Google One Tap sign-in
      google.accounts.id.prompt();
    } catch (error) {
      console.error('Error triggering Google sign-in:', error);
      alert('Error starting Google Sign-In: ' + error);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
