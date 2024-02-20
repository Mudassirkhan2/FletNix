import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  age: number = 0;
  error = false;
  errorMessage = 'All fields are required';
  registerForm = this.fb.nonNullable.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    age: new FormControl(null, [Validators.required])
  });
  constructor(private fb: FormBuilder) { }
  http = inject(HttpClient);
  router = inject(Router);
  onSubmit() {
    // if empty show error
    if (this.registerForm.value.email === '' || this.registerForm.value.password === '' || this.registerForm.value.age === null) {
      console.log('Error: All fields are required');
      this.errorMessage = 'All fields are required';
      this.error = true;
      return;
    }
    if (this.registerForm.get('email')?.errors?.['email']) {
      console.log('Error: Email is invalid');
      this.errorMessage = 'Email is invalid';
      this.error = true;
      return;
    }
    if (this.registerForm.get('password')?.errors?.['minlength']) {
      console.log('Error: Password is too short');
      this.errorMessage = 'Password is too short';
      this.error = true;
      return;
    }
    if (this.registerForm.get('age')?.errors?.['age']) {
      console.log('Error: Age is invalid');
      this.errorMessage = 'Age is invalid';
      this.error = true;
      return;
    }
    this.email = this.registerForm.value.email ?? '';
    this.password = this.registerForm.value.password ?? '';
    this.age = this.registerForm.value.age ?? 0;
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Age:', this.age);
    this.error = false;
    this.signup();
  }

  signup() {
    this.http.post('http://localhost:3000/user/signup', {
      email: this.email,
      password: this.password,
      age: this.age
    }).subscribe((res) => {
      console.log(res);
      // redirect to login page
      this.router.navigate(['/login']);
    });
  }
}
