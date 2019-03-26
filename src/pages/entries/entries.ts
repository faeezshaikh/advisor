import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html',
})
export class EntriesPage {
  timesheetDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.timesheetDetails = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntriesPage');
  }

}
