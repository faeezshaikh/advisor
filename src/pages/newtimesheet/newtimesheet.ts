import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-newtimesheet',
  templateUrl: 'newtimesheet.html',
})
export class NewtimesheetPage {
  hospital:string;
  monthOf:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private helper:HelperProvider, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtimesheetPage');
  }

  addTimesheet(){
    console.log('Hospital:',this.hospital);
     console.log('Month of:',this.monthOf);
    
    
    this.helper.addTimesheet(this.helper.getLoggedInUserProfile().email,this.hospital,this.monthOf);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
