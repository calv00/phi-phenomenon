import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(public authService: AuthService, private router:Router) {
    
   }
  ngOnInit() {
    this.authService.user.subscribe(
      (auth) => {
        if (auth == null) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['']);
        }
      });
  }
  login() {
    this.authService.login();
    this.router.navigate(['']);
  }
}