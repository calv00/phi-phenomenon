import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialogRef } from '@angular/material';

import { MovieService } from '../../providers/movie.service';

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  private movieTitle: string = '';
  private marks: Number[] = [1,2,3,4,5,6,7,8,9,10];
  private selectedMark: Number;
  private errorMessage: string;

  constructor(
      public dialogRef: MdDialogRef<DialogFormComponent>,
      private db: AngularFireDatabase,
      private movieService: MovieService
  ) { }

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
      const movieObservable = this.db.list('/movies');
    var movie = {
      title: movieJson.title,
      mark: this.selectedMark,
      posterUrl: movieJson.poster
    };
    // Interacting with Observable/Promise
    movieObservable.push(movie);
    },
  error => this.errorMessage = <any>error
    );
  }

}
