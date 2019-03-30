import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HelperProvider } from '../providers/helper/helper';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  loggedIn:boolean = false;
  loggedinUser:any;
  version;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen ,  private helper:HelperProvider, public events:Events) {
    this.initializeApp();

    this.version = this.helper.getVersion();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Timesheets', component: ListPage, icon:'paper' },
      { title: 'Logout', component: HomePage, icon:'log-out' }
    ];

    this.listenToLoginEvents();

    if(this.checkLoginExpiry()){ // if session expired
      this.rootPage = LoginPage;
      this.loggedIn = false;
    } else {
      console.log('session exists so dont show again...');
      this.rootPage = ListPage;
      this.loggedIn = true;
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if(page.title == 'Logout') {
      this.logout();
      return;
    }
    this.nav.setRoot(page.component);
  }

  logout() {
    console.log("Publishing logout event");
    // localStorage.removeItem('r'); 
    this.helper.deleteFromStorage("user");
    this.events.publish('user:logout');
  
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (userId) => {
      // console.log('Heard Login !!');
      this.checkLoginExpiry();
      this.loggedIn = true;
      this.helper.setCollectionEndpoint();
      this.rootPage =  ListPage ;
    });
    


    this.events.subscribe('user:logout', () => {
      // console.log('Heard Logout !!');
      this.loggedIn = false;
      this.checkLoginExpiry();
      this.rootPage =  LoginPage;
    });
  }

  checkLoginExpiry(){

    let user:any = this.helper.getLoggedInUserProfile();
    if(user == null || user == undefined) { // not logged in.
      this.loggedIn = false; //important to hide the sidemenu if session is expired.
      this.loggedinUser = null;
      return true; // yes session is expired
    } else {
        this.loggedIn = true;
        this.loggedinUser = user;
        console.log('Logged in user:',this.loggedinUser);
        
        return false; // session not expired
    }
  }


}
