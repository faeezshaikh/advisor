import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,AlertController, Loading } from 'ionic-angular';
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
  loading:boolean = true;
  

  items: Observable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams,public helper:HelperProvider,
     private modalCtrl:ModalController,public alertController: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.items = this.helper.getItems();
    this.items.subscribe(()=> this.loading = false);
  }

  itemTapped(event, item) {
    console.log('Tapped:',item);
    
    this.navCtrl.push(EntriesPage, {
      timesheet: item,
      previewMode:false
    });
  }

  deleteItem(item){
    this.helper.deleteTimesheet(item);
  }

  updateTimesheet(item) {
    this.navCtrl.push(NewtimesheetPage,{timesheetDetails:item});
  }
  openTimesheetModal() {
      let profileModal = this.modalCtrl.create(NewtimesheetPage, { userId: 8675309 });
      profileModal.present();
  }

  export(timesheet){
    console.log('Exporting...',timesheet);

    this.helper.export(timesheet);
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

  preview(timesheet){
    this.navCtrl.push(EntriesPage, {
      timesheet: timesheet,
      previewMode:true
    });
  }

}
