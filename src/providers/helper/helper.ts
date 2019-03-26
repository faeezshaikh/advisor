import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators';


@Injectable()
export class HelperProvider {
  items: Observable<any[]>;
  constructor(public http: HttpClient,public db: AngularFirestore) {
    console.log('Hello HelperProvider Provider');
    
  }

  getItems(){
 return this.db.collection('user1').valueChanges();
  }

}
