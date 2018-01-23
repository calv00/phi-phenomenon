import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FirebaseService } from '../../providers/firebase.service';

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.css']
})
export class MenuOptionsComponent implements OnInit {

  @Output()
  changeCategoryEE:EventEmitter<{}> = new EventEmitter();

  constructor(
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  categoryMovies() {
    this.changeCategoryEE.emit({ category: 'movies'});
  }

  categoryTvshows() {
    this.changeCategoryEE.emit({ category: 'tvshows'});
  }

  categoryBooks() {
    console.log("Books category click");
  }

  categoryVideogames() {
    this.changeCategoryEE.emit({ category: 'videogames'});
  }

  closeFloatMenu() {

  }

}
