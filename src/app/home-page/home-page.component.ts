import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private user_displayName: String;
  private user_email: String;
  private movies: FirebaseListObservable<any[]>;
  private movieTitle: String = '';
  private marks: Number[] = [1,2,3,4,5,6,7,8,9,10];
  private selectedMark: Number;

  constructor(public authService: AuthService, private db: AngularFireDatabase, private router: Router) {
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
  saveMovie(title: String, mark: Number) {
    const movieObservable = this.db.list('/movies');
    var movie = {
      title: this.movieTitle,
      mark: this.selectedMark,
      posterUrl: this.getPoster(title)
    };
    // Interacting with Observable/Promise
    movieObservable.push(movie);
  }
  
  private getPoster(title: String) {
    return 'https://i.pinimg.com/736x/78/72/66/78726686611e3c9b6cbe3f1ede601fcf--star-wars-vii-star-trek.jpg';
  }

}