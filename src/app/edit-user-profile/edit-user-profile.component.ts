import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

username: any = {}

@Input() userDetails = {
  name: '',
  username: '',
  password: '',
  email: '',
  birthday: ''
};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
   * Gets the user info on initialization
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user information
   */
  getUser(): void {
    let username = localStorage.getItem('username');
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      this.username = res;
    });
  }

  /**
   * Method will send 'PUT' data to the database to update the user's account info'
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userDetails).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('username', res.username)
      console.log(res)
      this.snackBar.open(this.userDetails.username, 'Updated', {
        duration: 3000
      });
      }, (res) => {
        this.snackBar.open(res, 'OK', {
          duration: 3000
        });
        setTimeout(function () {
          window.location.reload();
        }, 3000); 
    });
  }

  /**
   * Method will delete the user's account
   * Includes a warning prior to deletion
   * Clears local storage 
   * Informs user their account was deleted
   * Routes user to the welcome page
   */
  deleteUser(): void { 
    if(confirm('Deleting your profile cannot be undone')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      },
      (res) => {
      this.snackBar.open(res, 'Your account has been deleted', {
        duration: 3000
      });
      this.router.navigate(['welcome']).then(() => {
        window.location.reload()
      }); 
      });
    }
  }

  /**
   * Allows the user to cancel their choice of updating or deleting their account
   */
  cancel(): void {
    this.router.navigate(['profile']).then(() => {
      window.location.reload();
    });
  }

}
