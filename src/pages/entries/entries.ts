import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail';
import { HelperProvider } from '../../providers/helper/helper';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html',
})
export class EntriesPage {
  timesheetDetails:any;
  entries: Observable<any[]>;

  constructor(public navCtrl: NavController, 
    private helper: HelperProvider, public navParams: NavParams,private modalCtrl:ModalController) {
    this.timesheetDetails = navParams.get('item');
    console.log('Timesheet object:', this.timesheetDetails);
    
    this.entries = this.helper.getTimesheetEntries(this.timesheetDetails.id);

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntriesPage');
  }

  openEntryModal() {
    let profileModal = this.modalCtrl.create(EntryDetailPage, { hospital: this.timesheetDetails.hospital, timesheetId: this.timesheetDetails.id });
    profileModal.present();
}
  

}
