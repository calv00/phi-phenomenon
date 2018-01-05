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

  openFloatMenu() {
    console.log("Float menu click");
  }

}
