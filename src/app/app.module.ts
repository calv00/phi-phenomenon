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
import { VideogameService } from './providers/videogame.service';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CardsPageComponent } from './cards-page/cards-page.component';
import { DialogFormComponent } from './shared/dialog-form/dialog-form.component';
import { DialogUpdateComponent } from './shared/dialog-update/dialog-update.component';
import { DialogRemoveComponent } from './shared/dialog-remove/dialog-remove.component';
import { MenuOptionsComponent } from './shared/menu-options/menu-options.component';
import { SortMenuComponent } from './shared/sort-menu/sort-menu.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
  { path: 'cards', component: CardsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '404', component: NotFoundPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CardsPageComponent,
    DialogFormComponent,
    DialogUpdateComponent,
    DialogRemoveComponent,
    MenuOptionsComponent,
    SortMenuComponent,
    NotFoundPageComponent
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
    TvshowService,
    VideogameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }