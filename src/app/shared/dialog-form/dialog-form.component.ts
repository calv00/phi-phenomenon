import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MdDialogRef } from '@angular/material';

import { MovieService } from '../../providers/movie.service';
import { MoviesService } from '../../providers/movies.service';
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
  viewSearch: boolean = false;
  movieList: any[];
  selectedMovie: string;

  constructor(
      public dialogRef: MdDialogRef<DialogFormComponent>,
      public authService: AuthService,
      private db: AngularFireDatabase,
      private movieService: MovieService,
      private moviesService: MoviesService
  ) {

  }

  ngOnInit() {
  }

  addMovieTitle(title: string) {
    this.movieTitle = title;
  }
  selectMark(mark: Number) {
    this.selectedMark = mark;
  }

  selectMovie(movieTitle: string) {
    this.selectedMovie = movieTitle;
  }

  searchMovie() {
    this.viewSearch = true;
    this.movieService.getMovies(this.movieTitle)
    .subscribe(
      movies => {
        this.movieList = movies;
      },
      error => this.errorMessage = <any>error
    );
  }

  saveMovie() {
    this.movieService.getMovie(this.selectedMovie)
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
    this.moviesService.createMovie(this.authService.getUid(), newMovie);
    // Interacting with Observable/Promise
    this.dialogRef.close();
    },
    error => this.errorMessage = <any>error
  );
  }

}
