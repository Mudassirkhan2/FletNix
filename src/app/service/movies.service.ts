import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }
  fetchMovie(title: string) {
    return this.http.get<any[]>(`https://fletnix-6srj.onrender.com/${title}`, {});
  }
}
