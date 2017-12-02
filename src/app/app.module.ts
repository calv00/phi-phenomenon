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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { firebaseConfig } from '../environments/config';

import { AuthService } from './providers/auth.service';
import { MovieService } from './providers/movie.service';
import { FirebaseMovieService } from './providers/firebase-movie.service';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DialogFormComponent } from './home-page/dialog-form/dialog-form.component';
import { DialogUpdateComponent } from './home-page/dialog-update/dialog-update.component';
import { DialogRemoveComponent } from './home-page/dialog-remove/dialog-remove.component';
import { MenuOptionsComponent } from './home-page/menu-options/menu-options.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    DialogFormComponent,
    DialogUpdateComponent,
    DialogRemoveComponent,
    MenuOptionsComponent
  ],
  entryComponents: [
    DialogFormComponent,
    DialogUpdateComponent,
    DialogRemoveComponent
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
    InfiniteScrollModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    MovieService,
    FirebaseMovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }