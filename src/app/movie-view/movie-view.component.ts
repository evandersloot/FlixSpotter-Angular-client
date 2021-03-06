import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  constructor( 
    
  /**
  * Inject to retrieve movie details from movie object
  */
  @Inject(MAT_DIALOG_DATA)
  public data: {
    title: string,
    description: string,
  }
  ) { }

  ngOnInit(): void {
  }

}
