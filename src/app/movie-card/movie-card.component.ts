import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackbar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description},
      width: '750px'
    })
  }

  openDirector(name: string, bio: string, birth: Date, death: Date): void {
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

}
