import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';


@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
