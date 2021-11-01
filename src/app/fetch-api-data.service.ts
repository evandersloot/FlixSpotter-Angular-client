import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declare api url for providing data
const apiUrl = 'https://flixspotter.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
//inject HttpClient mod to constructor params
//will provide HttpClient to entire class, making available w/ this.http
  constructor(private http: HttpClient) { 
  }
// making api call for user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/registration', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // api call for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // api call to get all movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
    catchError(this.handleError)
    );
  }

  // api call to get a single movie
  getMovies(title: any): Observable<any> {
    return this.http.get(apiUrl +  `movies/:title`).pipe(
    catchError(this.handleError)
    );
  }

  // api call to get director
  getDirectors(name: any): Observable<any> {
    return this.http.get(apiUrl + `directors/:name`).pipe(
    catchError(this.handleError)
    );
  }

  // api call to get genre
  getGenres(name: any): Observable<any> {
    return this.http.get(apiUrl + `genres/:name`).pipe(
    catchError(this.handleError)
    );
  }

  //api call to get user by username
  getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + `users/:username`).pipe(
    catchError(this.handleError)
    );
  }

  // api call to get list of favorites
  getFavoriteMovies(username: any): Observable<any> {
    return this.http.get(apiUrl + `users/${username}/movies`).pipe(
    catchError(this.handleError)
    );
  }

  // api call to add movie to favorites
  addMovie(username: any, movieId: any): Observable<any> {
    return this.http.post(apiUrl + `users/:username/movies/:movieId`, {}).pipe(
    catchError(this.handleError)
    );
  }

  // api call to edit user
  editUser(username: any, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `users/${username}`, userDetails).pipe(
    catchError(this.handleError)
    )
  }

  // api call to delete user
  deleteUser(username: any, userDetails: any): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, userDetails).pipe(
    catchError(this.handleError)
    )
  }

  // api call to delete movie from favorites
  deleteMovie(username: any, movie: any): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/remove/${movie}`).pipe(
    catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('An error occurrred:', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; try again later.'
    );
  }
}
