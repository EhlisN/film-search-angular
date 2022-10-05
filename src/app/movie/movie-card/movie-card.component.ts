import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/model/movie.model';
import { MoviePreview } from 'src/app/shared/model/moviePreview.model';
import { OmdbService } from 'src/app/shared/service/omdb.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: MoviePreview;
  details!: IMovie;
  isShowDetails: boolean = false;

  constructor(private omdbService: OmdbService) { }

  ngOnInit(): void {
  }

  getMovieById() {
    this.omdbService.getMovieById(this.movie.imdbID).subscribe((data) => {
      this.details = data;
      this.isShowDetails = true;
      console.log(data)
    })
  }

}
