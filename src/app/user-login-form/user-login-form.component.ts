import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// brings in api calls
import { FetchApiDataService } from '../fetch-api-data.service';
//display notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Details required for a user to log in
   */
  @Input() userDetails = { 
    Username: '', 
    Password: '', 
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  ngOnInit(): void {
  }

  /**
   * Sends a login request to the database
   * - saves username to local storage
   * - saves token to local storage
   * - redirects user to the movies page upon success
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userDetails).subscribe((result) => {
      localStorage.setItem('username', result.user.username);
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); //closes modal
      console.log(result)
      this.snackBar.open('Wecome back', this.userDetails.Username!, {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
