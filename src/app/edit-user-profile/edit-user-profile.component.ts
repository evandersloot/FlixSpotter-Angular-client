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
  username: '',
  password: '',
  email: '',
  birthday: '',
};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.username = res;
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('username', res.username)
      console.log(res)
      this.snackBar.open(this.userDetails.username, 'Updated');
      }, (res) => {
        this.snackBar.open(res, 'OK', {
          duration: 3000});
        setTimeout(function () {
          window.location.reload();
        }, 3000);
    });
  }

  deleteUser(): void { 
    if(confirm('Deleting your profile cannot be undone')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['profile']).then(() => {
      window.location.reload();
    });
  }

}
