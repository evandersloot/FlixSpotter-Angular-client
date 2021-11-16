import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  /**
   * Get movies and favorites on initialization
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Get all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens genre modal containing info about specific genre
   * @param name (genre name)
   * @param description (genre description)
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description},
      width: '750px'
    })
  }

  /**
   * Opens director modal containing info about specific director
   * @param name (director name)
   * @param bio (director bio)
   * @param birth (director DOB)
   * @param death (dirctor DOD)
   */
  openDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {name, bio, birth, death},
      width: '750px',
      backdropClass: 'director-container'
    })
  }
  
  /**
   * Opens modal with title and description of specific movie
   * @param title (movie title)
   * @param description (movie description)
   */
  openMovieView(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {title, description},
      width: '750px'
    })
  }

  /**
   * Gets the user's selected favortie movies
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('username')
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites
    })
  }

  /**
   * Adds a favorite movie to the user's list
   * @param movieId (movie's id from MongoDb)
   * @param Title (movie title)
   * @returns (status message whether the movie was added or not)
   */
  addFavoriteMovie(movieId: string, Title: string): void {
    this.fetchApiData.addMovie(movieId).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 3000,
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
    });
    return this.getFavoriteMovies();
  }

  /**
   * Deletes a favorite movie from the user's list
   * @param movieId (movie's id from MongoDb)
   * @param Title (movie title)
   * @returns (status message whether the movie was deleted or not)
   */
  deleteFavoriteMovie(movieId: string, Title: string): void {
    this.fetchApiData.deleteMovie(movieId).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed`, 'OK', {
        duration: 3000,
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
    });
    return this.getFavoriteMovies();
  }
 
  /**
   * Compares the movie id to the user's list to display the status correctly
   * @param movieId (movie's id from MongoDb)
   * @returns (the correct display of the favorite icon)
   */
  setFavoriteStatus(movieId: any): any {
    if (this.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

}
