import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';


@Component({
  selector: 'page-newtimesheet',
  templateUrl: 'newtimesheet.html',
})
export class NewtimesheetPage {
  hospital:string;


  year:string;
  month :string;
  currentYear;
  currentMonth;


  constructor(public navCtrl: NavController, public navParams: NavParams,private helper:HelperProvider, public viewCtrl: ViewController) {
    this.currentYear=new Date().getFullYear().toString();
    this.currentMonth = new Date().getMonth();
    this.year = this.currentYear;
    this.month = this.currentMonth;
    console.log('Curr month:',this.month);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtimesheetPage');
  }

  addTimesheet(){
    console.log('Hospital:',this.hospital);
    let monthOf = this.getMonthName(this.month) + ' ' + this.year;
     console.log('Month of:',this.month + ' ' + this.year);
    this.helper.addTimesheet(this.helper.getLoggedInUserProfile().email,this.hospital,monthOf);
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getMonthName(no) {
    console.log('month no:',no);
    
    let month;
    switch(no) {
      case 0:
        // code block
        month= "Jan";
        break;
      case 1:
        // code block
        month= "Feb";
        break;
      case 2:
      month= "Mar";
      break;
      case 3:
      month= "Apr";
      break;
      case 4:
      month= "May";  
      break;
        case 5:
        month= "Jun";   
        break; 
     case 6:
     month= "Jul";  
     break;
        case 7:
        month= "Aug";
        break;  
        case 8:
        month= "Sep"; 
        break; 
        case 9:
        month= "Oct";
        break;  
        case 10:
        month= "Nov"; 
        break;
        case 11:
        month= "Dec"; 
        break;
      
  
    }
    console.log('returning..',month);
    
    return month;
  }

}
