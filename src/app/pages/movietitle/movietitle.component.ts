import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movietitle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movietitle.component.html',
  styleUrl: './movietitle.component.css'
})
export class MovietitleComponent implements OnInit {
  movietitle = '';
  movieDetails: any = {};
  http = inject(HttpClient);
  constructor(
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.movietitle = this.route.snapshot.params['movietitle']
    this.fetchMovie()
  }

  fetchMovie() {
    this.http.get(`https://fletnix-6srj.onrender.com/${this.movietitle}`, {}).subscribe((res) => {
      this.movieDetails = res;
    });
  }
}
