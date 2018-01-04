import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class MoviesService {
  private user_displayName: String;
  private user_email: String;

  constructor(private db: AngularFireDatabase) { }

  getMovies(authUID, offset, startKey?): FirebaseListObservable<any> {
    return this.db.list('/users/'.concat(authUID) , {
      query: {
        orderByKey: true,
        startAt: startKey,
        limitToFirst: offset+1
      }
    });
  }
}
