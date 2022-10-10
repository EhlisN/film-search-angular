import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../model/movie.model';
import { MoviePreview } from '../model/moviePreview.model';
import { ResponseData } from '../model/omdb.model';

const API_KEY = '6230c842';
const API_URL = 'http://www.omdbapi.com';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  constructor(private httpClient: HttpClient) {}

  getAllMovies(): Observable<ResponseData<MoviePreview>> {
    return this.httpClient.get<ResponseData<MoviePreview>>(
      `${API_URL}/?&apikey=${API_KEY}`
    );
  }
  getMoviesByTitle(title: string): Observable<ResponseData<MoviePreview>> {
    return this.httpClient.get<ResponseData<MoviePreview>>(
      `${API_URL}/?s=${title}&apikey=${API_KEY}`
    );
  }
  getMovieById(id: string): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${API_URL}/?i=${id}&apikey=${API_KEY}`);
  }
  getMoviesByType(type: string): Observable<ResponseData<MoviePreview>> {
    return this.httpClient.get<ResponseData<MoviePreview>>(
      `${API_URL}/?type=${type}&apikey=${API_KEY}`
    );
  }
  getMoviesByTitleAndType(
    title: string,
    type: string
  ): Observable<ResponseData<MoviePreview>> {
    return this.httpClient.get<ResponseData<MoviePreview>>(
      `${API_URL}/?s=${title}&type=${type}&apikey=${API_KEY}`
    );
  }
}
