import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MoviesService {

  private limitNumber: number = 16;
  private limit:BehaviorSubject<number> = new BehaviorSubject<number>(this.limitNumber);

  private childAttribute: string = '';

  constructor(
    private db: AngularFireDatabase
  ) { }

  setLimitNumber(limitNumber:number): void {
    this.limitNumber = limitNumber;
  }

  getLimitNumber(): number {
    return this.limitNumber;
  }

  setchildAttribute(childAttribute:string): void {
    this.childAttribute = childAttribute;
  }

  getchildAttribute(): string {
    return this.childAttribute;
  }

  showMore(): void {
    this.limit.next(this.limit.getValue() + 8);
  }

  getMovies(authUID): FirebaseListObservable<any> {
    return this.db.list('/users/'.concat(authUID) , {
      query: {
        orderByChild: this.childAttribute,
        //limitToFirst: this.limit.value
      }
    });
  }

  getMoviesReversed(authUID): FirebaseListObservable<any> {
    return this.db.list('/users/'.concat(authUID) , {
      query: {
        orderByChild: this.childAttribute,
        //limitToFirst: this.limit.value
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    
  }
}
