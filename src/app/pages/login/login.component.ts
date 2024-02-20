import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error = false;
  loginForm = this.fb.nonNullable.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  errorMessage = 'All fields are required';
  constructor(private fb: FormBuilder) { }
  http = inject(HttpClient);
  router = inject(Router);

  onSubmit() {
    if (this.loginForm.value.email === '' || this.loginForm.value.password === '') {
      console.log('Error: All fields are required');
      this.errorMessage = 'All fields are required';
      this.error = true;
      return;
    }
    if (this.loginForm.get('email')?.errors?.['email']) {
      console.log('Error: Email is invalid');
      this.errorMessage = 'Email is invalid';
      this.error = true;
      return;
    }
    if (this.loginForm.get('password')?.errors?.['minlength']) {
      console.log('Error: Password is too short');
      this.errorMessage = 'Password is too short';
      this.error = true;
      return;
    }
    this.email = this.loginForm.value.email ?? '';
    this.password = this.loginForm.value.password ?? '';
    this.login();
  }
  login() {
    console.log('Login');
    this.http.post<any>('https://fletnix-6srj.onrender.com/user/login', {
      email: this.email,
      password: this.password
    }).subscribe((res) => {
      console.log(res);
      if (res.message === 'Invalid credentials') {
        this.error = true;
        this.errorMessage = 'Invalid credentials';
        return;
      }
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.user._id);
      this.router.navigate(['/']);
    });
  }

}
