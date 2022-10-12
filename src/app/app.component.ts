import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MoviePreview } from './shared/model/moviePreview.model';
import { ResponseData } from './shared/model/omdb.model';
import { OmdbService } from './shared/service/omdb.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  movies: MoviePreview[] = [];
  movieTitle: string = '';
  movieType: string = '';
  totalResults!: number;
  pageIndex: number = 1;
  openSearch: boolean = false;
  notFound!: string;

  types: Type[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'series', viewValue: 'Series' },
    { value: 'episode', viewValue: 'Episode' },
  ];

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {}

  getMovies(isSearchMovie?: boolean) {
    this.pageIndex = isSearchMovie ? 1 : this.pageIndex;
    this.notFound = '';
    if (this.movieTitle && this.movieType) {
      this.omdbService
        .getMoviesByTitleAndType(
          this.movieTitle,
          this.movieType,
          this.pageIndex
        )
        .subscribe((response: ResponseData<MoviePreview>) => {
          if (response.Response !== 'False') {
            this.movies = response.Search;
            this.totalResults = Number(response.totalResults);
          } else {
            this.movies = [];
            this.notFound = `Not found ${this.movieTitle} ${this.movieType}!!!`;
          }
        });
    }
    if (this.movieTitle && !this.movieType) {
      this.omdbService
        .getMoviesByTitle(this.movieTitle, this.pageIndex)
        .subscribe((response: ResponseData<MoviePreview>) => {
          if (response.Response !== 'False') {
            this.movies = response.Search;
            this.totalResults = Number(response.totalResults);
          } else {
            this.notFound = `Not found ${this.movieTitle}!!!`;
          }
        });
    }
    this.openSearch = false;
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.getMovies();
  }
}
