import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { File } from '@ionic-native/file';


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

  getAdvisorDuties() {
    return this.db.collection('duties').valueChanges();
  }
  getTimesheetEntries(timesheetId) {
    return this.db.collection(this.collection_endpoint).doc(timesheetId).collection('entries').valueChanges();
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


generatePdf(elementId){
  const div = document.getElementById(elementId);
  const options = {background:"white",height :div.clientHeight , width : div.clientWidth  };
  html2canvas(div,options).then((canvas)=>{
    //Initialize JSPDF
    var doc = new jsPDF("p","mm","a4");
    //Converting canvas to Image
    let imgData = canvas.toDataURL("image/PNG");
    //Add image Canvas to PDF
    doc.addImage(imgData, 'PNG', 20,20 );
    
    let pdfOutput = doc.output();
    // using ArrayBuffer will allow you to put image inside PDF
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
    }


    //This is where the PDF file will stored , you can change it as you like
    // for more information please visit https://ionicframework.com/docs/native/file/
    // const directory = this.file.externalApplicationStorageDirectory ;

    //Name of pdf
    const fileName = "example.pdf";
    
    //Writing File to Device
    // this.file.writeFile(directory,fileName,buffer)
    // .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
    // .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));

    doc.save(fileName);


  });
}

export(elementId) {
  console.log('Exporting..');

  let doc = new jsPDF();

  let name =  'timepass.pdf';

  let specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  // let content = this.content.nativeElement;
  const content = document.getElementById(elementId);
  console.log('Content:', content);


  // let img = new Image();
  // img.src = this.project.diagram;
  // img.crossOrigin = "Anonymous";
  // doc.addImage(this.getBase64Image(img), 'PNG', 15, 40, 200, 114);

  doc.fromHTML(content.innerHTML, 20, 20, {
    'width': 140, // max width of content on PDF
    'elementHandlers': specialElementHandlers
  },
    function (bla) {
      console.log('File name:', name);
      doc.save(name);
    });
}
}
