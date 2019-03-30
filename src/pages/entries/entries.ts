import { Component } from '@angular/core';
import { NavController, NavParams,ModalController ,AlertController} from 'ionic-angular';
import { NewEntryPage } from '../newentry/newentry';
import { HelperProvider } from '../../providers/helper/helper';
import { Observable } from 'rxjs';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { NewtimesheetPage } from '../newtimesheet/newtimesheet';


@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html',
})
export class EntriesPage {
  timesheetDetails:any;
  entries: Observable<any[]>;
  entriesClone: Observable<any[]>;
  previewMode:boolean=false;
  loading:boolean=true;

  constructor(public navCtrl: NavController, 
    private helper: HelperProvider, public navParams: NavParams,private modalCtrl:ModalController,private alertController: AlertController) {
    this.timesheetDetails = navParams.get('timesheet');
    this.previewMode = navParams.get('previewMode');
    console.log('Timesheet object:', this.timesheetDetails);
    
    this.entries = this.helper.getTimesheetEntries(this.timesheetDetails.id);
    this.entries.subscribe(()=>{
        this.loading = false;
    });
    this.entriesClone = this.helper.getTimesheetEntries2(this.timesheetDetails.id);

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntriesPage');
  }

  export(){
    console.log('Exporting...',this.timesheetDetails);

    this.helper.export(this.timesheetDetails);
  }
  openEntryModal() {
    let profileModal = this.modalCtrl.create(NewEntryPage, { hospital: this.timesheetDetails.hospital, timesheetId: this.timesheetDetails.id });
    profileModal.present();
}
  
  itemTapped(e,entry){
    entry.timesheetId = this.timesheetDetails.id;
    console.log('Entry details:',entry);
    this.navCtrl.push(NewEntryPage,{entry:entry});
  }

  cancel(){
    this.navCtrl.pop();
  }
  deleteItem(entry){
    this.helper.deleteEntryTimesheet(this.timesheetDetails.id ,entry);
  }

  updateTimesheet(){
    this.navCtrl.push(NewtimesheetPage,{timesheetDetails:this.timesheetDetails});
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
