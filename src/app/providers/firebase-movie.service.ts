import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class FirebaseMovieService {

  private pathA = '';
  constructor(private db: AngularFireDatabase,
  private authService: AuthService) { }
  
  getMovies(batch, path, lastKey?) {
    let query =  {
            orderByKey: true,
            limitToFirst: batch,
          }
    if (lastKey) query['startAt'] = lastKey
    this.authService.uid$.subscribe(uid => {
      this.pathA = '/users/'.concat(uid);
    });
    console.log(this.pathA);
    return this.db.list(this.pathA, {
      query
    })
  }
}
