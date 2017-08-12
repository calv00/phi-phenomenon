import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../providers/auth.service';
import { MovieService } from '../providers/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private user_displayName: String;
  private user_email: String;
  private movies: FirebaseListObservable<any[]>;
  private movieTitle: string = '';
  private marks: Number[] = [1,2,3,4,5,6,7,8,9,10];
  private selectedMark: Number;

  private movieApiTitle: string = '';
  private movieApiPoster: string = '';

  private errorMessage: string;

  constructor(public authService: AuthService,
     private movieService: MovieService,
     private db: AngularFireDatabase,
     private router: Router) {
    this.authService.user.subscribe(
      (auth) => {
        if (auth == null) {

          this.user_displayName = '';
          this.user_email = '';
          this.router.navigate(['login']);
        } else {
          
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
        }
      }
    );
    this.movies = db.list('movies');
  }
  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
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