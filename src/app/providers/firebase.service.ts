import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FirebaseService {

  private limitNumber: number = 16;
  private limit:BehaviorSubject<number> = new BehaviorSubject<number>(this.limitNumber);

  private dbChild: string = 'movies';
  private childAttribute: string = '';
  private items: FirebaseListObservable<any[]>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  setLimitNumber(limitNumber:number): void {
    this.limitNumber = limitNumber;
  }

  getLimitNumber(): number {
    return this.limitNumber;
  }

  setDbChild(dbChild: string): void {
    this.dbChild = dbChild;
  }

  getDbChild(): string {
    return this.dbChild;
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

  getItems(authUID): FirebaseListObservable<any> {
    return this.db.list('/users/'.concat(authUID).concat(`/${this.dbChild}`) , {
      query: {
        orderByChild: this.childAttribute,
        //limitToFirst: this.limit.value
      }
    });
  }

  getItemsReversed(authUID): FirebaseListObservable<any> {
    return this.db.list('/users/'.concat(authUID).concat(`/${this.dbChild}`) , {
      query: {
        orderByChild: this.childAttribute,
        //limitToFirst: this.limit.value
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>; 
  }

  createItem(authUID, item) {
    this.db.list('/users/'.concat(authUID).concat(`/${this.dbChild}`)).push(item);
  }

  updateItem(authUID, item, result) {
    this.db.list('/users/'.concat(authUID).concat(`/${this.dbChild}`)).update(item.$key, { mark: result });
  }

  deleteItem(authUID, item) {
    this.db.list('/users/'.concat(authUID).concat(`/${this.dbChild}`)).remove(item.$key);
  }

  /*
  class MyComp {
  questions: FirebaseListObservable<any[]>;
  value: FirebaseObjectObservable<any>;
  constructor(af: AngularFire) {
    this.questions = af.database.list('/questions');
    this.value = af.database.object('/value');
  } 
  addToList(item: any) {
    this.questions.push(item);
  }
  removeItemFromList(key: string) {
    this.questions.remove(key).then(_ => console.log('item deleted!'));
  }
  deleteEntireList() {
    this.questions.remove().then(_ => console.log('deleted!'));
  }
  setValue(data: any) {
    this.value.set(data).then(_ => console.log('set!'));
  }
  updateValue(data: any) {
    this.value.update(data).then(_ => console.log('update!'));
  }
  deleteValue() {
    this.value.remove().then(_ => console.log('deleted!'));
  }
}
  */
}
