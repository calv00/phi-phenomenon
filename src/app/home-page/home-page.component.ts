import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../providers/auth.service';
import { MovieService } from '../providers/movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class HomePageComponent implements OnInit {

  private user_displayName: String;
  private user_email: String;
  private user_photoURL: String;
  private movies: FirebaseListObservable<any[]>;
  private movieTitle: string = '';
  private marks: Number[] = [1,2,3,4,5,6,7,8,9,10];
  private selectedMark: Number;
  private errorMessage: string;
  private showSaveButton: boolean = false;
  flip: string = 'inactive';

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
          this.user_photoURL = auth.photoURL;
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
    if (this.movieTitle !== '') {
      this.showSaveButton = true;
    }
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
    this.movieTitle = '';
    this.showSaveButton = false;
    },
  error => this.errorMessage = <any>error
    );
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}