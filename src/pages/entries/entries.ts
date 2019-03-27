import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail';


@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html',
})
export class EntriesPage {
  timesheetDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl:ModalController) {
    this.timesheetDetails = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntriesPage');
  }

  openEntryModal() {
    let profileModal = this.modalCtrl.create(EntryDetailPage, { hospital: this.timesheetDetails.hospital });
    profileModal.present();
}
  

}
