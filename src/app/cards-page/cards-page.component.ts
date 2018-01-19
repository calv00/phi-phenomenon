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
  selector: 'cards-page',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.css'],
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
export class CardsPageComponent implements OnInit {

  private user_displayName: String;
  private user_email: String;
  private orderFlag: boolean = false; //ASC if true / DESC if false
  user_photoURL: String;
  cards: FirebaseListObservable<any[]>;
  cardCategory: string = 'movies';
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
          this.getCards();
        }
      }
    );
  }
  ngOnInit() {
  }

  showMenu() {
    this.menuFlag =! this.menuFlag;
  }

  changeCategory(event) {
    this.cardCategory = event['category'];
    this.firebaseService.setDbChild(event['category']);
    this.getCards();
  }

  sort(event) {
    this.firebaseService.setchildAttribute(event['child']);
    if (event['order'] == 'ASC') {
      this.orderFlag = true;
    }
    else {
      this.orderFlag = false;
    }
    this.getCards();
  }

  scroll() {
    this.firebaseService.showMore();
    this.getCards();
  }

  private getCards() {
    if (this.orderFlag == true) {
      this.getCardsAscending(this.authService.getUid());
    }
    else {
      this.getCardsDescending(this.authService.getUid());
    }
  }

  private getCardsAscending(authUID) {
    this.subscription = this.firebaseService.getItems(authUID)
      .subscribe(cards => {
        this.cards = cards;
      });
  }

  private getCardsDescending(authUID) {
    this.subscription = this.firebaseService.getItemsReversed(authUID)
      .subscribe(cards => {
        this.cards = cards;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  openDialogForm() {
    console.log(this.cardCategory);
    let dialogRef = this.dialog.open(DialogFormComponent, { data: this.cardCategory});
    dialogRef.afterClosed().subscribe(result => this.getCards());
  }

  toggleUserFlip() {
    this.flipUser = (this.flipUser == 'inactive') ? 'active' : 'inactive';
  }

  toggleFlip(index: number) {
    this.flip[index] = (this.flip[index] === undefined || this.flip[index] == 'inactive') ? 'active' : 'inactive';
    if (this.flipUser === 'active') this.flipUser = 'inactive';
  }

  editCard(card: any) {
    let dialogRef = this.dialog.open(DialogUpdateComponent, { data: card.title });
    dialogRef.afterClosed().subscribe(result => {
      this.firebaseService.updateItem(this.authService.getUid(), card, result);
      this.getCards();
    });
  }

  deleteCard(card: any) {
    let dialogRef = this.dialog.open(DialogRemoveComponent, { data: card.title });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.firebaseService.deleteItem(this.authService.getUid(), card);
        this.getCards();
      }
    });
  }

}