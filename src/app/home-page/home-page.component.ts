import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdDialog } from '@angular/material';
import * as _ from "lodash";

import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { DialogRemoveComponent } from './dialog-remove/dialog-remove.component';
import { AuthService } from '../providers/auth.service';
import { MoviesService } from '../providers/movies.service';

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
  menuFlag: boolean = false;

  subscription: any;

  constructor(
     public dialog: MdDialog,
     public authService: AuthService,
     public moviesService: MoviesService,
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
          this.getMoviesReversed(auth.uid)
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
    this.moviesService.setchildAttribute(event['child']);
    if (event['order'] == 'ASC') {
      this.getMovies(this.authService.getUid());
    }
    else {
      this.getMoviesReversed(this.authService.getUid());
    }
  }

  scroll() {
    this.moviesService.showMore();
    this.getMovies(this.authService.getUid());
  }

  private getMovies(authUID) {
    this.subscription = this.moviesService.getMovies(authUID)
      .subscribe(movies => {
        this.movies = movies;
      });
  }

  private getMoviesReversed(authUID) {
    this.subscription = this.moviesService.getMoviesReversed(authUID)
      .subscribe(movies => {
        this.movies = movies;
      });
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
      this.moviesService.updateMovie(this.authService.getUid(), movie, result);
    });
  }

  deleteMovie(movie: any) {
    let dialogRef = this.dialog.open(DialogRemoveComponent, { data: movie.title });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') this.moviesService.deleteMovie(this.authService.getUid(), movie);
    });
  }

}