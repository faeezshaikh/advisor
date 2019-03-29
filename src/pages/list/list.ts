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
  timesheetPdfTitle:string;
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
      timesheet: item,
      previewMode:false
    });
  }

  deleteItem(item){
    this.helper.deleteTimesheet(item);
  }


  openTimesheetModal() {
      let profileModal = this.modalCtrl.create(NewtimesheetPage, { userId: 8675309 });
      profileModal.present();
  }

  export(timesheet,elementId){
    console.log('Exporting...',timesheet);
    this.getRows(timesheet);
    this.timesheetPdfTitle = timesheet.hospital + " " + timesheet.monthOf;
  }

  getRows(timesheet){
    let filename = timesheet.hospital+'_'+timesheet.monthOf+'.pdf';
    let arr =  [];

    let that = this;
    console.log('This.items..');
    this.helper.getItems2().subscribe((timesheet:any[]) => {
      console.log('Received Timesheet',timesheet);
      console.log('printing id..',timesheet[0].payload.doc.id);
      
      
      that.helper.getTimesheetEntries2(timesheet[0].payload.doc.id).subscribe(entries => {
        console.log('Received timesheet entries:',entries);
        entries.map(a =>  {
          console.log("Entries paylod:", a.payload.doc);
          if(a.payload.doc.exists) {
              console.log('Doc data:',a.payload.doc.data());
              let obj = {
                "date": a.payload.doc.data().entryDate,
                "hospital":a.payload.doc.data().hospital,
                "dutyNo":a.payload.doc.data().dutyNo,
                "expendedTime":a.payload.doc.data().expendedTime,
                "activity":a.payload.doc.data().activities
              }
              
              arr.push(obj);
              
          }
        })
        
        that.helper.export(that.getCols(),arr,filename,that.timesheetPdfTitle);
      })
    });
    console.log('Pringint enf..');
    

  }
  getCols(){
   
    return  [{
      title: "Date Activity Performed",
      dataKey: "date"
  },
  {
      title: "Hospital at which Activity Performed",
      dataKey: "hospital"
  },
  {
      title: "Duty from List Above",
      dataKey: "dutyNo"
  },
  
  {
      title: "Time Expended (In Quarter Hrs)",
      dataKey: "expendedTime"
  },
  
  {
      title: "Activities Performed Under this Duty (Brief Description of Activity is REQUIRED)",
      dataKey: "activity"
  }
];
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
