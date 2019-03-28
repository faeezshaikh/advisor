import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { CONFIG } from '../assets/env';
import { HelperProvider } from '../providers/helper/helper';
import { HttpClientModule } from '@angular/common/http'; 
import { EntriesPage } from '../pages/entries/entries';
import { NewtimesheetPage } from '../pages/newtimesheet/newtimesheet';
import { ReversePipe } from '../providers/helper/reversePipe';
import { NewEntryPage } from '../pages/newentry/newentry';
import { DutiesPage } from '../pages/duties/duties';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    EntriesPage,
    NewtimesheetPage,
    ReversePipe,
    NewEntryPage,
    DutiesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(CONFIG.firebase),
    HttpClientModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EntriesPage,
    NewEntryPage,
    NewtimesheetPage,
    DutiesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HelperProvider
  ]
})
export class AppModule {}
