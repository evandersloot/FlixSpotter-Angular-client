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
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // api call for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.userError)
    );
  }

  // api call to get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call to get a single movie
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call to get director
  getDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:name',  {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call to get genre
  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  //api call to get user by username
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call to get list of favorites
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + 'users/' + username + '/movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call to add movie to favorites
  addMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // api call to edit user
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // api call to delete user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // api call to delete movie from favorites
  deleteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/remove/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // extract response, return body of response
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }
  private userError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Are you registered?', error.error.message);
    } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
    'You are not a registered user. Please sign up.'
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
