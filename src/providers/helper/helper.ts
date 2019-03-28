import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class HelperProvider {
  items: Observable<any[]>;
  collection_endpoint = 'user1';
  constructor(public http: HttpClient, public db: AngularFirestore) {
    console.log('Hello HelperProvider Provider');

  }

  getItems() {
    return this.db.collection('user1').valueChanges();
  }

  getTimesheetEntries(timesheetId) {
    return this.db.collection('user1').doc(timesheetId).collection('entries').valueChanges();
  }

  deleteTimesheet(timesheet) {
    console.log('Timesheet details:', timesheet);

    this.db.collection('user1').doc(timesheet.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deleteEntryTimesheet(timesheetId, entry) {

    this.db.collection('user1').doc(timesheetId).collection('entries').doc(entry.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  addTimesheet(userId, hospital, monthOf) {
    let that = this;
    this.db.collection(userId).add({
      hospital: hospital,
      monthOf: monthOf
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        let obj = {
          id: docRef.id
        }
        // Adding the id field on the object, so that it can easily deleted or found by 'id' later
        that.db.doc(that.collection_endpoint + '/' + docRef.id).update(obj);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

  updateEntryInTimesheet(entryId, timesheetId, hospital, expendedTime,
    entryDate, dutyNo, activities) {

    this.db.collection('user1').doc(timesheetId).collection('entries').doc(entryId).
      update({
        hospital: hospital,
        expendedTime: expendedTime,
        entryDate: entryDate,
        dutyNo: dutyNo,
        activities: activities
      })
      .then(function (docRef) {
        console.log("Document updated successfully");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }

  addEntryToTimesheet(timesheetId, hospital, expendedTime,
    entryDate, dutyNo, activities) {
    let that = this;
    this.db.collection('user1').doc(timesheetId).collection('entries').
      add({
        hospital: hospital,
        expendedTime: expendedTime,
        entryDate: entryDate,
        dutyNo: dutyNo,
        activities: activities
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        let obj = {
          id: docRef.id
        }
        // Adding the id field on the object, so that it can easily deleted or found by 'id' later
        that.db.doc(that.collection_endpoint + '/' + timesheetId + '/entries/' + docRef.id).update(obj);

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }
}
