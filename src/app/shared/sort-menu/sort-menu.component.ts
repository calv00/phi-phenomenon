import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sort-menu',
  templateUrl: './sort-menu.component.html',
  styleUrls: ['./sort-menu.component.css']
})
export class SortMenuComponent implements OnInit {

  titleAsc: boolean = false;
  titleDesc: boolean = false;
  markAsc: boolean = false;
  markDesc: boolean = false;
  timeAsc: boolean = false;
  timeDesc: boolean = true;

  @Output()
  sortEE:EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sortByTitle() {
    this.markAsc = false;
    this.markDesc = false;
    this.timeAsc = false;
    this.timeDesc = false;

    if (this.titleAsc){
      this.titleAsc = false;
      this.titleDesc = true;
      this.sortEE.emit({ child: 'title', order: 'DESC'}); //DESC
    } else {
      this.titleAsc = true;
      this.titleDesc = false;
      this.sortEE.emit({ child: 'title', order: 'ASC'}); //ASC
    }
  }

  sortByMark() {
    this.titleAsc = false;
    this.titleDesc = false;
    this.timeAsc = false;
    this.timeDesc = false;

    if (this.markAsc){
      this.markAsc = false;
      this.markDesc = true;
      this.sortEE.emit({ child: 'mark', order: 'DESC'}); //DESC
    } else {
      this.markAsc = true;
      this.markDesc = false;
      this.sortEE.emit({ child: 'mark', order: 'ASC'}); //ASC
    }
  }

  sortByTime() {
    this.titleAsc = false;
    this.titleDesc = false;
    this.markAsc = false;
    this.markDesc = false;
    if (this.timeAsc){
      this.timeAsc = false;
      this.timeDesc = true;
      this.sortEE.emit({ child: 'time', order: 'DESC'}); //DESC
    } else {
      this.timeAsc = true;
      this.timeDesc = false;
      this.sortEE.emit({ child: 'time', order: 'ASC'}); //ASC
    }
  }

  allFlagsFalse() {
    this.titleAsc = false;
    this.titleDesc = false;
    this.markAsc = false;
    this.markDesc = false;
    this.timeAsc = false;
    this.timeDesc = false;
  }

}
