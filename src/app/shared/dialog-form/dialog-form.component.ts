import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { MovieService } from '../../providers/movie.service';
import { TvshowService } from '../../providers/tvshow.service';
import { VideogameService } from '../../providers/videogame.service';
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
      private videogameService: VideogameService,
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
    this.viewSearch = true;
    switch (this.data) {
      case 'movies': {
        this.searchMovie();
        break;
      }
      case 'tvshows': {
        this.searchTvshow();
        break;
      }
      case 'videogames': {
        this.searchVideogame();
        break;
      }
    }
  }

  private searchMovie() {
    this.movieService.getMovies(this.itemTitle)
    .subscribe(
      movies => {
        this.itemList = movies;
      },
      error => this.errorMessage = <any>error
    );
  }

  private searchTvshow() {
    this.tvshowService.getTvshows(this.itemTitle)
    .subscribe(
      tvshows => {
        this.itemList = tvshows;
      },
      error => this.errorMessage = <any>error
    );
  }

  private searchVideogame() {
    this.videogameService.getVideogames(this.itemTitle)
    .subscribe(
      videogames => {
        this.itemList = videogames;
      },
      error => this.errorMessage = <any>error
    );
  }

  saveItem() {
    switch (this.data) {
      case 'movies': {
        this.saveMovie();
        break;
      }
      case 'tvshows': {
        this.saveTvshow();
        break;
      }
      case 'videogames': {
        this.saveVideogame();
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
    this.dialogRef.close();
  }

  saveVideogame() {
    var newVideogame: any;
    if (this.selectedMark === undefined) {
      newVideogame = {
        title: this.selectedItem.title,
        posterUrl: this.selectedItem.poster
      };
    }
    else {
      newVideogame = {
        title: this.selectedItem.title,
        mark: this.selectedMark,
        posterUrl: this.selectedItem.poster
      };
    }
  this.firebaseService.createItem(this.authService.getUid(), newVideogame);
  this.dialogRef.close();
}

  private setPosterUrl(url: string): string {
    var aux1 = url.slice(0, 26);
    var aux2 = url.slice(30, url.length);
    return aux1.concat('w500').concat(aux2);
  }

}
