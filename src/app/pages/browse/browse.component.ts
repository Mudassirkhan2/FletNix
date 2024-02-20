import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../../service/movies.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [MatPaginatorModule, RouterModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})

export class BrowseComponent implements OnInit {
  currentPage = 0;
  pageSize = 15;
  moviesdata: any = [];
  movies: any = [];
  lengthItems = 500;
  searchValue = '';
  filterValue = '';
  userId: string | null = '';
  searchForm = this.fb.nonNullable.group({
    searchValue: ''
  });
  filterForm = this.fb.nonNullable.group({
    filterValue: ''
  });
  constructor(private moviesService: MoviesService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.fetchMovies();
  }
  http = inject(HttpClient);

  handlePage(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
    const start = this.currentPage * this.pageSize;
    this.movies = this.moviesdata.slice(start, start + this.pageSize);
  }

  onSearchSubmit() {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    console.log(this.searchValue)
    if (this.searchValue === '') {
      this.fetchMovies();
    } else {
      this.fetchMovie();
    }
  }

  onFilterChange(value: string) {
    this.filterValue = value ?? '';
    // filter movies by type
    if (this.filterValue === 'movie') {
      this.movies = this.moviesdata.filter((movie: { type: string; }) => movie.type === 'Movie');
      this.lengthItems = this.movies.length;
      this.movies = this.movies.slice(0, this.pageSize);
    }
    else if (this.filterValue === 'tvshow') {
      this.movies = this.moviesdata.filter((movie: { type: string; }) => movie.type === 'TV Show');
      this.lengthItems = this.movies.length;
      this.movies = this.movies.slice(0, this.pageSize);

    }
    else {
      this.lengthItems = this.moviesdata.length;
      this.movies = this.moviesdata.slice(0, this.pageSize);
    }
  }

  fetchMovie() {
    this.moviesService.fetchMovie(this.searchValue).subscribe((res) => {
      console.log(res)
      if (res.length === 0) {
        console.log('No movie found')
      }
      else {
        this.movies = res;
      }
      console.log(this.searchValue)
    });
  }
  fetchMovies() {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId)
    this.http.get(`http://localhost:3000/movies/${this.userId}`, {}).subscribe((res) => {
      this.moviesdata = res;
      console.log(this.moviesdata)
      this.lengthItems = this.moviesdata.length;
      this.movies = this.moviesdata.slice(0, this.pageSize);
    });
  }
}
