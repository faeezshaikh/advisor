import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/helper/authservice';
import { ListPage } from '../list/list';
import { HelperProvider } from '../../providers/helper/helper';
import { EventsService } from '../../providers/helper/eventsService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private helper:HelperProvider,
    private eventsService:EventsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signMeInWithTwitter(){
    this.authService.doTwitterLogin()
    .then(res => {
      console.log('Success with Twitter',res);
      this.helper.setLoggedInUserProfile({'email': res.additionalUserInfo.username, 'name':res.user.displayName,'photoURL':res.user.photoURL});
      this.eventsService.sendLoggedInEvent();
      this.navCtrl.setRoot(ListPage);

    })
  }



  signMeInWithGoogle(){
    this.authService.doGoogleLogin()
    .then(res => {
      console.log('Success with Google',res);
      this.helper.setLoggedInUserProfile({'email': res.user.email, 'name':res.user.displayName,'photoURL':res.user.photoURL});
      this.eventsService.sendLoggedInEvent();
      this.navCtrl.setRoot(ListPage);

    })
  }

  signMeInWithFacebook(){
    this.authService.doFacebookLogin()
    .then(res => {
      console.log('Success with Facebook',res);

      this.helper.setLoggedInUserProfile({'email': res.user.email, 'name':res.user.displayName,'photoURL':res.user.photoURL});
      this.eventsService.sendLoggedInEvent();
      this.navCtrl.setRoot(ListPage);

    })
  }

}
