import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { FavoritesComponent } from '../favorites/favorites.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((result: any) => {
      this.user = result;
    });
  }

  openEditUserProfile(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '500px'
    });
  }

  openFavorites(): void {
    this.dialog.open(FavoritesComponent, {
      width: '750px'
    });
  }

  cancel(): void {
    this.router.navigate(['/user-profile']).then(() => {
      window.location.reload();
    });
  }

}
