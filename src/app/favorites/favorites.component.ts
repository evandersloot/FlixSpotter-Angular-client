import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  user: any = {};
  favoriteMovies: any = [];
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites();
    });
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('username')
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.favoriteMovies;
      console.log(this.favorites);
      return this.favorites
    })
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }console.log(this.favoriteMovies);
    });
    return this.favoriteMovies;
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description},
      width: '750px'
    })
  }

  openDirector(name: string, bio: string, birth: number, death: number): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {name, bio, birth, death},
      width: '750px'
    })
  }

  openMovieView(title: string, description: string): void {
    this.dialog.open(MovieViewComponent, {
      data: {title, description},
      width: '750px'
    })
  }

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

  setFavoriteStatus(movieId: any): any {
    if (this.favorites.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }
 
}
