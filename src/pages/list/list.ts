import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HelperProvider } from '../../providers/helper/helper';
import { EntriesPage } from '../entries/entries';
import { NewtimesheetPage } from '../newtimesheet/newtimesheet';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  // icons: string[];
  items: Observable<any[]>;
  // items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public helper:HelperProvider,private modalCtrl:ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

    this.items = this.helper.getItems();
  }

  itemTapped(event, item) {
    console.log('Tapped:',item);
    
    this.navCtrl.push(EntriesPage, {
      item: item
    });
  }

  deleteItem(e,item){
    this.helper.deleteTimesheet(item);
  }


  openTimesheetModal() {
      let profileModal = this.modalCtrl.create(NewtimesheetPage, { userId: 8675309 });
      profileModal.present();
  }
}
