import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators';


@Injectable()
export class HelperProvider {
  items: Observable<any[]>;
  collection_endpoint = 'user1';
  constructor(public http: HttpClient,public db: AngularFirestore) {
    console.log('Hello HelperProvider Provider');
    
  }

  getItems(){
 return this.db.collection('user1').valueChanges();
  }

  deleteTimesheet(timesheet){
    console.log('Timesheet details:',timesheet);
    
    this.db.collection('user1').doc(timesheet.id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  addTimesheet(userId,hospital,monthOf){
    let that = this;
    this.db.collection(userId,).add({
      hospital: hospital,
      monthOf: monthOf
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      let obj = {
        id: docRef.id
      }
      that.db.doc(that.collection_endpoint + '/' + docRef.id).update(obj);

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  
  }

}
