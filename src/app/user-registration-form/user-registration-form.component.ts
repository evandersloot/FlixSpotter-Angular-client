import { Component, OnInit, Input } from '@angular/core';
// close dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// brings in api calls
import { FetchApiDataService } from '../fetch-api-data.service';
//display notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { 
    Name: '', 
    Username: '', 
    Password: '', 
    Email: '', 
    Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // send form inputs to the backend and returns success or error
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    // Logic goes here
      console.log(result)
      this.dialogRef.close(); //closes modal
      this.snackBar.open(`'${result.username}' has been successfully registered`, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
