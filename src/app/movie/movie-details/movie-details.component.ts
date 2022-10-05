import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/model/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  @Input() details!: IMovie;
  @Input() isShowDetails!: boolean;
  hide: string = "show";

  constructor() { }

  ngOnInit(): void {
  }

}
