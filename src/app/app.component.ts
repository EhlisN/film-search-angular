import { Component, OnInit } from '@angular/core';
import { MoviePreview } from './shared/model/moviePreview.model';
import { ResponseData } from './shared/model/omdb.model';
import { OmdbService } from './shared/service/omdb.service';

interface Type {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  movies!: MoviePreview[];
  movieTitle: string = "shrek";
  movieType: string = "movie";

  types: Type[] = [
    {value: 'movie', viewValue: 'Movie'},
    {value: 'series', viewValue: 'Series'},
    {value: 'episode', viewValue: 'Episode'},
  ];

  constructor(private omdbService: OmdbService){}

  ngOnInit() {
  }

  getMovies() {
    this.omdbService.getMoviesByTitle(this.movieTitle).subscribe((response: ResponseData<MoviePreview>)=> {
      this.movies = response.Search;
      console.log(this.movies)
    })
  }
}
