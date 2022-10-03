import { Component, OnInit } from '@angular/core';
import { OmdbService } from './shared/service/omdb.service';

interface Food {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private omdbService: OmdbService){}

  ngOnInit() {
    this.omdbService.getMoviesByTitle("shrek").subscribe(data => {
      console.log(data);
    })
  }
}
