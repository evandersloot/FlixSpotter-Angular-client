import { Component, OnInit, Input } from '@angular/core';
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

  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // send form inputs to the backend and returns success or error
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('username', result.user.username);
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); //closes modal
      console.log(result)
      this.snackBar.open(`Welcome back '${result.username}'`, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
