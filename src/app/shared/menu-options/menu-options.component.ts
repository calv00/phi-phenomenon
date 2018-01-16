import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.css']
})
export class MenuOptionsComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  searchMenuClick() {
    console.log("Search menu click");
  }

  sortMenuClick() {
    console.log("Sort menu click");
  }

  viewsMenuClick() {
    console.log("Views menu click");
  }

  categoryMenuClick() {
    console.log("Category menu click");
  }

  closeFloatMenu() {

  }

}
