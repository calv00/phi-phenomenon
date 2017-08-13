import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MdButtonModule, MdIconModule, MdInputModule, MdDialogModule, MdButtonToggleModule } from '@angular/material';

import { firebaseConfig } from '../environments/config';

import { AuthService } from './providers/auth.service';
import { MovieService } from './providers/movie.service';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DialogFormComponent } from './home-page/dialog-form/dialog-form.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    DialogFormComponent
  ],
  entryComponents: [
    DialogFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdDialogModule,
    MdButtonToggleModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }