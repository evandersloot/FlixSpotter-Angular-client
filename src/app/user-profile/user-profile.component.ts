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

  /**
   * Gets user information upon initialization
   * @ returns user object
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user information
   */
  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * Open modal for user to edit their account information
   */
  openEditUserProfile(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '500px'
    });
  }

  /**
   * Allows the user to cancel their choice to edit account information
   */
  cancel(): void {
    this.router.navigate(['/user-profile']).then(() => {
      window.location.reload();
    });
  }

}
