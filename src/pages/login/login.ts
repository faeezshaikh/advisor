import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/helper/authservice';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signMeInWithTwitter(){
    this.authService.doTwitterLogin()
    .then(res => {
      console.log('Success with Twitter',res);
      if(res.user.email != null )
      //    this.dataService.setLoggedInUserEmail(res.user.email);
      res.user.email;
      else 
      res.user.displayName;
      res.user.photoURL;
          // this.dataService.setLoggedInUserEmail(res.user.displayName);
      // this.eventService.sendLoggedInEvent();
      this.navCtrl.setRoot(ListPage);

    })
  }



  signMeInWithGoogle(){
    this.authService.doGoogleLogin()
    .then(res => {
      console.log('Success with Google',res);
      ////
      // res.user.email;
      // res.user.displayName;
      // res.user.photoURL;
      ////
      // this.dataService.setLoggedInUserEmail(res.user.email);
      // this.eventService.sendLoggedInEvent();
      this.navCtrl.setRoot(ListPage);

    })
  }

}
