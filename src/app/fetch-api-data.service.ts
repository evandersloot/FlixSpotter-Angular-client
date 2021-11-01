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

export class UserRegistrationService {
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
