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


  constructor(public navCtrl: NavController, 
    private helper: HelperProvider, public navParams: NavParams,private viewCtrl:ViewController) {
    this.hospital = this.navParams.get('hospital');
    this.timesheetId = this.navParams.get('timesheetId');
    console.log('Hospital:',this.navParams.get('hospital'));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  addEntry(){
    this.helper.addEntryToTimesheet(this.timesheetId,this.hospital,this.expendedTime,
      this.entryDate,this.dutyNo,this.activities);

      this.dismiss();

  }
}
