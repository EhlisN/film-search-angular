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
  movieTitle: string = 'doris';
  movieType: string = '';
  totalResults!: number;
  pageIndex: number = 1;

  types: Type[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'series', viewValue: 'Series' },
    { value: 'episode', viewValue: 'Episode' },
  ];

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
  }

  getMovies(isSearchMovie?: boolean) {
    this.pageIndex = isSearchMovie ? 1 : this.pageIndex;
    if (this.movieTitle && this.movieType) {
      console.log('type + title');
      this.omdbService
        .getMoviesByTitleAndType(this.movieTitle, this.movieType, this.pageIndex)
        .subscribe((response: ResponseData<MoviePreview>) => {
          this.movies = response.Search;
          this.totalResults = Number(response.totalResults);
        });
    }
    if (this.movieTitle && !this.movieType) {
      console.log('title');
      this.omdbService
        .getMoviesByTitle(this.movieTitle, this.pageIndex)
        .subscribe((response: ResponseData<MoviePreview>) => {
          this.movies = response.Search;
          this.totalResults = Number(response.totalResults);
        });
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.getMovies();
  }
}

