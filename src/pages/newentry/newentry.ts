import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'newentry',
  templateUrl: 'newentry.html',
})
export class NewEntryPage {
  hospital;
  expendedTime;
  entryDate;
  dutyNo;
  activities;
  timesheetId;

  existingEntry = null;


  constructor(public navCtrl: NavController, 
    private helper: HelperProvider, public navParams: NavParams,private viewCtrl:ViewController) {
    this.existingEntry = this.navParams.get('entry');
    if(this.existingEntry != null) {
      // Display and Edit Existing Entry
      this.hospital = this.existingEntry.hospital;
      this.expendedTime = this.existingEntry.expendedTime;
      this.entryDate = this.existingEntry.entryDate;
      this.dutyNo = this.existingEntry.dutyNo;
      this.activities = this.existingEntry.activities;
      this.timesheetId = this.existingEntry.timesheetId;

    } else {

      this.hospital = this.navParams.get('hospital');
      this.timesheetId = this.navParams.get('timesheetId');
      console.log('Hospital:',this.navParams.get('hospital'));
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  addEntry(){
    console.log('Adding..',this.timesheetId + ',' + this.hospital + ',' + this.expendedTime + ',' + this.entryDate + ',' + this.dutyNo + ',' + this.activities);
    this.helper.addEntryToTimesheet(this.timesheetId,this.hospital,this.expendedTime,
      this.entryDate,this.dutyNo,this.activities);

      
      this.dismiss();

  }
}
