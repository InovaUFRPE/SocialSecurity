import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { BeforeLoginPage } from '../pages/before-login/before-login';
import { OccurrencesPage } from '../pages/occurrences/occurrences';
import { RegisterPage } from './../pages/register/register';
import { AlertPage } from '../pages/alert/alert';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedPageModule } from '../pages/feed/feed.module';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

import { Users } from '../providers/usuario/users/users';
import { GoogleMapComponent } from "../components/google-map/google-map";

import { SQLite } from '@ionic-native/sqlite';
import { Vibration } from '@ionic-native/vibration';
import { DatabaseProvider } from '../providers/database/database';
import { CoordinatesProvider } from '../providers/ocorrencias/coordinates/coordinates';
import { OcurrenceController } from '../providers/ocorrencias/ocurrence-controller/ocurrence-controller';
import { UsersController } from '../providers/usuario/users-controller/users-controller';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    BeforeLoginPage,
    GoogleMapComponent,
    OccurrencesPage,
    RegisterPage,
    AlertPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FeedPageModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    BeforeLoginPage,
    OccurrencesPage,
    RegisterPage,
    AlertPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Users,
    SQLite,
    Toast,
    DatabaseProvider,
    CoordinatesProvider,
    OcurrenceController,
    UsersController,
    Vibration
  ]
})
export class AppModule {}
