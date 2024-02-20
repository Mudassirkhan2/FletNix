import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  searchForm = this.fb.nonNullable.group({
    email: '',
    password: '',
    age: null
  });
  constructor(private fb: FormBuilder) { }
  http = inject(HttpClient);
  router = inject(Router);
  onSubmit() {
    // if empty show error
    if (this.searchForm.value.email === '' || this.searchForm.value.password === '' || this.searchForm.value.age === null) {
      console.log('Error: All fields are required');
      this.error = true;
      return;
    }
    this.email = this.searchForm.value.email ?? '';
    this.password = this.searchForm.value.password ?? '';
    this.age = this.searchForm.value.age ?? 0;
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Age:', this.age);
    this.error = false;
    this.login();
  }

  login() {
    console.log('Login');
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
