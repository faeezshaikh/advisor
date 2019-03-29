import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import * as jsPDF from 'jspdf';


import jsPDF from 'jspdf';
import 'jspdf-autotable';



@Injectable()
export class HelperProvider {
  items: Observable<any[]>;
  collection_endpoint;
  loggedInUser:any= {};
  constructor(public http: HttpClient, public db: AngularFirestore) {
    console.log('Hello HelperProvider Provider');
 
    this.setCollectionEndpoint();

  }

  setCollectionEndpoint(){
    if(this.getLoggedInUserProfile()!=null) {
      this.collection_endpoint = this.getLoggedInUserProfile().email;
      console.log('Collection endpoint:' , this.collection_endpoint);
    }
  }
  getItems() {
    return this.db.collection(this.collection_endpoint).valueChanges();
  }

  getItems2() {
    return this.db.collection(this.collection_endpoint).snapshotChanges();
  }

  getAdvisorDuties() {
    return this.db.collection('duties').valueChanges();
  }
  getTimesheetEntries(timesheetId) {
    return this.db.collection(this.collection_endpoint).doc(timesheetId).collection('entries').valueChanges();
  }

  getTimesheetEntries2(timesheetId) {
    return this.db.collection(this.collection_endpoint).doc(timesheetId).collection('entries').snapshotChanges();
  }
  deleteTimesheet(timesheet) {
    console.log('Timesheet details:', timesheet);

    this.db.collection(this.collection_endpoint).doc(timesheet.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  deleteEntryTimesheet(timesheetId, entry) {

    this.db.collection(this.collection_endpoint).doc(timesheetId).collection('entries').doc(entry.id).delete().then(function () {
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

    this.db.collection(this.collection_endpoint).doc(timesheetId).collection('entries').doc(entryId).
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
    this.db.collection(this.collection_endpoint).doc(timesheetId).collection('entries').
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



setLoggedInUserProfile(user) {
  console.log('User set to :' , user);
  if(this.loggedInUser) {
    this.loggedInUser.email = user.email;
    this.loggedInUser.name = user.name;
    this.loggedInUser.photoURL = user.photoURL;
  }
  localStorage.setItem('user',JSON.stringify(user));
}


deleteFromStorage(key){
  console.log('Removing from storage  :' , key);
  if(key!=null)
    // this.storage.remove(key);
    localStorage.removeItem(key);
}
getLoggedInUserProfile() {
  let user = localStorage.getItem('user');
  console.log('Returning user:' , user);
  return JSON.parse(user);
}


export(columns,rows,filename,timesheetTile){
  console.log('Inside export, rows:',rows);
  console.log('Inside export, cols:',columns);
  console.log('Timesheet obj:',timesheetTile);
  
  

  
  var doc = new jsPDF('p', 'pt');
  
  var header = function (data) {
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text(timesheetTile, data.settings.margin.left, 50);
  };

  // var footer = function (data) {
  //   doc.setFontSize(8);
  //   doc.setTextColor(40);
  //   doc.setFontStyle('normal');
  //   doc.text(timesheetTile, data.settings.margin.bottom, 50);
  // };

 
  
  doc.autoTable(columns, rows, 
            {margin: {top: 80},
             didDrawPage: header,
             theme:'striped',
             bodyStyles: {valign: 'top'},
             styles: {cellWidth: 20,minCellHeight:30},
           
            //  styles: {overflow: 'linebreak'},
            //  columnStyles: {
            //   0: {columnWidth: 20},
            //   1: {columnWidth: 10},
            //   2: {columnWidth: 10},
            //   3: {columnWidth: 20},
            //   4: {columnWidth: 50},
            // }
           
            });
  
  doc.save(filename);



}

}
