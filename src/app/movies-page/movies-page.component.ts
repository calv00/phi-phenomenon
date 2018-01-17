import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import * as _ from "lodash";

import { DialogFormComponent } from '../shared/dialog-form/dialog-form.component';
import { DialogUpdateComponent } from '../shared/dialog-update/dialog-update.component';
import { DialogRemoveComponent } from '../shared/dialog-remove/dialog-remove.component';
import { AuthService } from '../providers/auth.service';
import { FirebaseService } from '../providers/firebase.service';

@Component({
  selector: 'movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css'],
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
export class MoviesPageComponent implements OnInit {

  private user_displayName: String;
  private user_email: String;
  private orderFlag: boolean = false; //ASC if true / DESC if false
  user_photoURL: String;
  movies: FirebaseListObservable<any[]>;
  flip: string[] = ['inactive'];
  flipUser: string = 'inactive';
  menuFlag: boolean = false;

  subscription: any;

  constructor(
     public dialog: MdDialog,
     public authService: AuthService,
     public firebaseService: FirebaseService,
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
          let userPath = '/users/'.concat(auth.uid);
          this.authService.setUid(auth.uid);
          this.firebaseService.setDbChild('movies');
          this.getMovies();
        }
      }
    );
  }
  ngOnInit() {
  }

  showMenu() {
    this.menuFlag =! this.menuFlag;
  }

  sort(event) {
    this.firebaseService.setchildAttribute(event['child']);
    if (event['order'] == 'ASC') {
      this.orderFlag = true;
    }
    else {
      this.orderFlag = false;
    }
    this.getMovies();
  }

  scroll() {
    this.firebaseService.showMore();
    this.getMovies();
  }

  private getMovies() {
    if (this.orderFlag == true) {
      this.getMoviesAscending(this.authService.getUid());
    }
    else {
      this.getMoviesDescending(this.authService.getUid());
    }
  }

  private getMoviesAscending(authUID) {
    this.subscription = this.firebaseService.getItems(authUID)
      .subscribe(movies => {
        this.movies = movies;
      });
  }

  private getMoviesDescending(authUID) {
    this.subscription = this.firebaseService.getItemsReversed(authUID)
      .subscribe(movies => {
        this.movies = movies;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  openDialogForm() {
    let dialogRef = this.dialog.open(DialogFormComponent, { data: 'movie'});
    dialogRef.afterClosed().subscribe(result => this.getMovies());
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
      this.firebaseService.updateItem(this.authService.getUid(), movie, result);
      this.getMovies();
    });
  }

  deleteMovie(movie: any) {
    let dialogRef = this.dialog.open(DialogRemoveComponent, { data: movie.title });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.firebaseService.deleteItem(this.authService.getUid(), movie);
        this.getMovies();
      }
    });
  }

}