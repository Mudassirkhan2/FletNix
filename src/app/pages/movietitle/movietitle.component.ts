import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movietitle',
  standalone: true,
  imports: [CommonModule],
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
    console.log(this.movietitle)
    this.fetchMovie()
  }

  fetchMovie() {
    this.http.get(`http://localhost:3000/${this.movietitle}`, {}).subscribe((res) => {
      console.log(res)
      this.movieDetails = res;
      console.log(this.movieDetails)
    });
  }
}
