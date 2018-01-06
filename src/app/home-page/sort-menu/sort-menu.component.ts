import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sort-menu',
  templateUrl: './sort-menu.component.html',
  styleUrls: ['./sort-menu.component.css']
})
export class SortMenuComponent implements OnInit {

  @Output()
  sortEE:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sortByTitle() {
    this.sortEE.emit('title');
  }

  sortByMark() {
    this.sortEE.emit('mark');
  }

  sortByTime() {
    this.sortEE.emit('');
  }

}
