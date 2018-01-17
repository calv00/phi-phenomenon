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
import { FirebaseService } from './providers/firebase.service';
import { TvshowService } from './providers/tvshow.service';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { DialogFormComponent } from './shared/dialog-form/dialog-form.component';
import { DialogUpdateComponent } from './shared/dialog-update/dialog-update.component';
import { DialogRemoveComponent } from './shared/dialog-remove/dialog-remove.component';
import { MenuOptionsComponent } from './shared/menu-options/menu-options.component';
import { SortMenuComponent } from './shared/sort-menu/sort-menu.component';
import { TvShowsPageComponent } from './tv-shows-page/tv-shows-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesPageComponent },
  { path: 'tvshows', component: TvShowsPageComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MoviesPageComponent,
    DialogFormComponent,
    DialogUpdateComponent,
    DialogRemoveComponent,
    MenuOptionsComponent,
    SortMenuComponent,
    TvShowsPageComponent
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
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    FirebaseService,
    MovieService,
    TvshowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }