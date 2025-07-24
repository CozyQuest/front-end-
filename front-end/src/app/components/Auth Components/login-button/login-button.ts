import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-button',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './login-button.html',
  styleUrl: './login-button.css'
})
export class LoginButton {
 loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) return;
    console.log('Login with:', this.loginForm.value);
  }

  loginWithGoogle() {
    console.log('Redirect to Google Sign-In');
    // implement Firebase / OAuth flow here
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
