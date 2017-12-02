import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { DialogRemoveComponent } from './dialog-remove/dialog-remove.component';
import { AuthService } from '../providers/auth.service';
import { FirebaseMovieService } from '../providers/firebase-movie.service';

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
    ]),
    trigger('flipUserState', [
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
  user_photoURL: String;
  movies: FirebaseListObservable<any[]>;
  flip: string[] = ['inactive'];
  flipUser: string = 'inactive';
  userPath: string = '';
  firebaseMovies = new BehaviorSubject([]);
  batch = 8;         // size of each query
  lastKey = '';      // key to offset next query from
  finished = false;  // boolean when end of database is reached

  constructor(
     public dialog: MdDialog,
     public authService: AuthService,
     private firebaseMovieService: FirebaseMovieService,
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
          this.userPath = '/users/'.concat(auth.uid);
          //this.movies = db.list(userPath);
        }
      }
    );
  }
  ngOnInit() {
    this.getMovies();
  }

  onScroll () {
    console.log('scrolled!!');
    this.getMovies();
  }
  private getMovies(key?) {
    if (this.finished) return
    this.firebaseMovieService
        .getMovies(this.batch+1, this.userPath, this.lastKey)
        .do(movies => {
          console.log(movies);
          /// set the lastKey in preparation for next query
          this.lastKey = _.last(movies)['$key']
          const newMovies = _.slice(movies, 0, this.batch)
          /// Get current movies in BehaviorSubject
          const currentMovies = this.firebaseMovies.getValue()
          /// If data is identical, stop making queries
          if (this.lastKey == _.last(newMovies)['$key']) {
            this.finished = true
          }
          /// Concatenate new movies to current movies
          this.firebaseMovies.next( _.concat(currentMovies, newMovies) )
        })
        .take(1)
        .subscribe()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  openDialogForm() {
    let dialogRef = this.dialog.open(DialogFormComponent);
  }

  toggleUserFlip() {
    this.flipUser = (this.flipUser == 'inactive') ? 'active' : 'inactive';
  }

  toggleFlip(index: number) {
    this.flip[index] = (this.flip[index] === undefined || this.flip[index] == 'inactive') ? 'active' : 'inactive';
    if (this.flipUser === 'active') this.flipUser = 'inactive';
  }

  editMovie(movie: any) {
    let dialogRef = this.dialog.open(DialogUpdateComponent, { data: movie.title });
    dialogRef.afterClosed().subscribe(result => {
      this.movies.update(movie.$key, { mark: result });
    });
  }

  deleteMovie(movie: any) {
    let dialogRef = this.dialog.open(DialogRemoveComponent, { data: movie.title });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') this.movies.remove(movie.$key);
    });
  }

}