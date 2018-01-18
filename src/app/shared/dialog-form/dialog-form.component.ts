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
  selectedItem = {
    title: '',
    poster: ''
  };

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

  selectItem(itemTitle: any) {
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
      var newMovie: any;
      if (this.selectedMark === undefined) {
        newMovie = {
          title: this.selectedItem.title,
          posterUrl: this.setPosterUrl(this.selectedItem.poster)
        };
      }
      else {
        newMovie = {
          title: this.selectedItem.title,
          mark: this.selectedMark,
          posterUrl: this.setPosterUrl(this.selectedItem.poster)
        };
      }
    this.firebaseService.createItem(this.authService.getUid(), newMovie);
    // Interacting with Observable/Promise
    this.dialogRef.close();
  }

  saveTvshow() {
      var newTvshow: any;
      if (this.selectedMark === undefined) {
        newTvshow = {
          title: this.selectedItem.title,
          posterUrl: this.setPosterUrl(this.selectedItem.poster)
        };
      }
      else {
        newTvshow = {
          title: this.selectedItem.title,
          mark: this.selectedMark,
          posterUrl: this.setPosterUrl(this.selectedItem.poster)
        };
      }
    this.firebaseService.createItem(this.authService.getUid(), newTvshow);
    // Interacting with Observable/Promise
    this.dialogRef.close();
  }

  private setPosterUrl(url: string): string {
    var aux1 = url.slice(0, 26);
    var aux2 = url.slice(30, url.length);
    return aux1.concat('w500').concat(aux2);
  }

}
