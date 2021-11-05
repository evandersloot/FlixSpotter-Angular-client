import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {
  isLoading = false;
  directors: any[] = [];
  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      bio: string,
      birth: number,
      death: number,
    }
  ) { }

  ngOnInit(): void {
  }

}
