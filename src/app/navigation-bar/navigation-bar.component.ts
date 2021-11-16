import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit {

  userDetails: any;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
   * Gets user details on initialization
   */
  ngOnInit(): void {
    this.getUserDetails()
  }
  
  /**
   * Gets user details to display username on the navigation bar
   */
  public getUserDetails(): void {
    this.userDetails = localStorage.getItem('username');
  }

  /**
   * method will clear the token and username from local storage
   * then navigates the user to the welcome page
   */
  signOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }
}