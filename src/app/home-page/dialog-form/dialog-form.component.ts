import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialogRef } from '@angular/material';

import { MovieService } from '../../providers/movie.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  private user_uid: string;
  private movieTitle: string = '';
  marks: Number[] = [1,2,3,4,5,6,7,8,9,10];
  private selectedMark: Number;
  private errorMessage: string;

  constructor(
      public dialogRef: MdDialogRef<DialogFormComponent>,
      public authService: AuthService,
      private db: AngularFireDatabase,
      private movieService: MovieService
  ) {
    this.authService.user.subscribe(
      (auth) => {
        if (auth == null) {
          this.user_uid = '';
        } else {
          this.user_uid = auth.uid;
        }
      }
    );
   }

  ngOnInit() {
  }

  addMovieTitle(title: string) {
    this.movieTitle = title;
  }
  selectMark(mark: Number) {
    this.selectedMark = mark;
  }

  saveMovie() {
    this.movieService.getMovie(this.movieTitle)
  .subscribe(
    movieJson => {
      let userPath = '/users/'.concat(this.user_uid);
      const movieObservable = this.db.list(userPath);
      if (this.selectedMark === undefined) {
        var pendingMmovie = {
          title: movieJson.title,
          posterUrl: movieJson.poster
        };
        movieObservable.push(pendingMmovie);
      }
      else {
        var ratedMovie = {
          title: movieJson.title,
          mark: this.selectedMark,
          posterUrl: movieJson.poster
        };
        movieObservable.push(ratedMovie);
      }
    // Interacting with Observable/Promise
    this.dialogRef.close();
    },
    error => this.errorMessage = <any>error
  );
    console.log(this.user_uid);
  }

}
