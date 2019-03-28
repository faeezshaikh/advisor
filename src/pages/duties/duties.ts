import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


@Component({
  selector: 'page-duties',
  templateUrl: 'duties.html',
})
export class DutiesPage {
  duties: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private helper: HelperProvider) {
    this.duties = this.helper.getAdvisorDuties();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DutiesPage');
  }

  filterItems(ev: any) {

    this.duties = this.helper.getAdvisorDuties();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      // this.projects = this.projects.filter(function (item) {
      //   return item.title.toLowerCase().includes(val.toLowerCase());
      // });

      // Filter the Observable. First map the Observale to List then Filter the List
      this.duties = this.duties.map(list => list.filter(function (item) {
        // return item.title.toLowerCase().includes(val.toLowerCase());
        if(item.text.toLowerCase().includes(val.toLowerCase())) return item.text.toLowerCase().includes(val.toLowerCase());
       
        
      }))
    }
  }

}
