import { Component, ViewChild } from '@angular/core';
import { MoviesService } from '../../service/movies.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  age: number = 0;

  constructor() {
    this.email = '';
    this.password = '';
    this.age = 0;
  }

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Age:', this.age);
  }
}
