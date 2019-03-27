import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';


@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {
  hospital;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
    this.hospital = this.navParams.get('hospital');
    console.log('Hospital:',this.navParams.get('hospital'));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
