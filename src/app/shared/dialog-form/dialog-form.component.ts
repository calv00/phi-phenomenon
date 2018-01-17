import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { MovieService } from '../../providers/movie.service';
import { TvshowService } from '../../providers/tvshow.service';
import { FirebaseService } from '../../providers/firebase.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  private user_uid: string;
  private itemTitle: string = '';
  marks: Number[] = [1,2,3,4,5,6,7,8,9,10];
  private selectedMark: Number;
  private errorMessage: string;
  viewSearch: boolean = false;
  itemList: any[];
  selectedItem: string;

  constructor(
      public dialogRef: MdDialogRef<DialogFormComponent>,
      @Inject(MD_DIALOG_DATA) public data: any,
      public authService: AuthService,
      private db: AngularFireDatabase,
      private movieService: MovieService,
      private tvshowService: TvshowService,
      private firebaseService: FirebaseService
  ) {

  }

  ngOnInit() {
  }

  addItemTitle(title: string) {
    this.itemTitle = title;
  }
  selectMark(mark: Number) {
    this.selectedMark = mark;
  }

  selectItem(itemTitle: string) {
    this.selectedItem = itemTitle;
  }

  searchItem() {
    switch (this.data) {
      case 'movie': {
        this.searchMovie();
        break;
      }
      case 'tvshow': {
        this.searchTvshow();
        break;
      }
    }
  }

  searchMovie() {
    this.viewSearch = true;
    this.movieService.getMovies(this.itemTitle)
    .subscribe(
      movies => {
        this.itemList = movies;
      },
      error => this.errorMessage = <any>error
    );
  }

  searchTvshow() {
    this.viewSearch = true;
    this.tvshowService.getTvshows(this.itemTitle)
    .subscribe(
      tvshows => {
        this.itemList = tvshows;
      },
      error => this.errorMessage = <any>error
    );
  }

  saveItem() {
    switch (this.data) {
      case 'movie': {
        this.saveMovie();
        break;
      }
      case 'tvshow': {
        this.saveTvshow();
        break;
      }
    }
  }

  saveMovie() {
    this.movieService.getMovie(this.selectedItem)
  .subscribe(
    movieJson => {
      var newMovie: any;
      if (this.selectedMark === undefined) {
        newMovie = {
          title: movieJson.title,
          posterUrl: movieJson.poster
        };
      }
      else {
        newMovie = {
          title: movieJson.title,
          mark: this.selectedMark,
          posterUrl: movieJson.poster
        };
      }
    this.firebaseService.createItem(this.authService.getUid(), newMovie);
    // Interacting with Observable/Promise
    this.dialogRef.close();
    },
    error => this.errorMessage = <any>error
  );
  }

  saveTvshow() {
    console.log(this.selectedItem);
    this.tvshowService.getTvshow(this.selectedItem)
  .subscribe(
    tvshowJson => {
      var newTvshow: any;
      if (this.selectedMark === undefined) {
        newTvshow = {
          title: tvshowJson.title,
          posterUrl: tvshowJson.poster
        };
      }
      else {
        newTvshow = {
          title: tvshowJson.title,
          mark: this.selectedMark,
          posterUrl: tvshowJson.poster
        };
      }
      console.log(newTvshow);
    this.firebaseService.createItem(this.authService.getUid(), newTvshow);
    // Interacting with Observable/Promise
    this.dialogRef.close();
    },
    error => this.errorMessage = <any>error
  );
  }

}
