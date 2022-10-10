import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMovie } from 'src/app/shared/model/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  // @Input() details!: IMovie;
  // @Input() isShowDetails!: boolean;
  // hide: string = 'show';

  constructor(@Inject(MAT_DIALOG_DATA) public data: IMovie) {}

  ngOnInit(): void {}
}
