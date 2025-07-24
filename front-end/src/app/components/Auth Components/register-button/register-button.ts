import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-button',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-button.html',
  styleUrl: './register-button.css'
})
export class RegisterButton {
   registerForm!: FormGroup; // ✅ Declare it but don't use it yet

  constructor(private fb: FormBuilder) {
    // ✅ Now fb is available — use it safely here
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
    }, { validators: [RegisterButton.passwordMatchValidator] });
  }

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  submitForm() {
    if (this.registerForm.invalid) return;
    console.log(this.registerForm.value);
  }
}