import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MoviesService } from '../../service/movies.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, MatPaginatorModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})

export class BrowseComponent implements OnInit {
  currentPage = 0;
  pageSize = 15;
  moviesdata: any = [];
  movies: any = [];
  lengthItems = 500;
  ngOnInit(): void {
    this.fetchMovies();
  }
  http = inject(HttpClient);

  handlePage(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    const start = this.currentPage * this.pageSize;
    this.movies = this.moviesdata.slice(start, start + this.pageSize);
  }

  fetchMovies() {
    this.http.get('http://localhost:3000/movies', {}).subscribe((res) => {
      this.moviesdata = res;
      console.log(res)
      this.lengthItems = this.moviesdata.length;
      this.movies = this.moviesdata.slice(0, this.pageSize);
    });
  }
}
