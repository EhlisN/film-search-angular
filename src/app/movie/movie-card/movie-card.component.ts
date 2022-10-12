import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMovie } from 'src/app/shared/model/movie.model';
import { MoviePreview } from 'src/app/shared/model/moviePreview.model';
import { OmdbService } from 'src/app/shared/service/omdb.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: MoviePreview;
  // details!: IMovie;
  isShowDetails: boolean = false;
  // moviePoster: string = this.movie.Poster;

  // moviePoster: string = this.movie.Poster !== 'N/A' ? this.movie.Poster : 'https://freedesignfile.com/upload/2014/07/Movie-time-design-elements-vector-backgrounds-01.jpg';

  constructor(private omdbService: OmdbService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  getPoster() {
    return this.movie.Poster !== 'N/A' ? this.movie.Poster : 'https://freedesignfile.com/upload/2014/07/Movie-time-design-elements-vector-backgrounds-01.jpg'
  }

  getMovieById() {
    this.isShowDetails = true;
    this.omdbService.getMovieById(this.movie.imdbID).subscribe((data) => {
      this.dialog.open(MovieDetailsComponent, { disableClose: true, data });
      this.isShowDetails = false;
    });
  }
}
