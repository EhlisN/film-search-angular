import { Component, OnInit } from '@angular/core';
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
  movies!: MoviePreview[];
  movieTitle: string = '';
  movieType: string = '';

  types: Type[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'series', viewValue: 'Series' },
    { value: 'episode', viewValue: 'Episode' },
  ];

  constructor(private omdbService: OmdbService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    if (this.movieTitle && this.movieType) {
      console.log('type + title');
      this.omdbService
        .getMoviesByTitleAndType(this.movieTitle, this.movieType)
        .subscribe((response: ResponseData<MoviePreview>) => {
          this.movies = response.Search;
        });
    }
    if (this.movieTitle && !this.movieType) {
      console.log('title');
      this.omdbService
        .getMoviesByTitle(this.movieTitle)
        .subscribe((response: ResponseData<MoviePreview>) => {
          this.movies = response.Search;
        });
    }
    if (!this.movieTitle && this.movieType) {
      console.log('type');
      this.omdbService
        .getMoviesByType(this.movieType)
        .subscribe((response: ResponseData<MoviePreview>) => {
          console.log(response);
          this.movies = response.Search;
        });
    }
    this.omdbService
      .getAllMovies()
      .subscribe((response: ResponseData<MoviePreview>) => {
        console.log(response);
        this.movies = response.Search;
      });
  }
}
