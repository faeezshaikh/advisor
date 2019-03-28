import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {
  entry;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.entry = this.navParams.get('entry');
    console.log('Entry Details inside:',this.entry);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

}
