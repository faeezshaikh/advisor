import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public helper:HelperProvider,
     private modalCtrl:ModalController,public alertController: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = this.helper.getItems();
  }

  itemTapped(event, item) {
    console.log('Tapped:',item);
    
    this.navCtrl.push(EntriesPage, {
      item: item
    });
  }

  deleteItem(item){
    this.helper.deleteTimesheet(item);
  }


  openTimesheetModal() {
      let profileModal = this.modalCtrl.create(NewtimesheetPage, { userId: 8675309 });
      profileModal.present();
  }

  export(elementId){
    this.helper.export(elementId);
    // this.helper.generatePdf(elementId);
  }


  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({

      message: 'Are you sure you want to delete this timesheet for ' + item.hospital,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteItem(item);
          }
        }
      ]
    });

    await alert.present();
  }

}
