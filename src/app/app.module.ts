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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedPageModule } from '../pages/feed/feed.module';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

import { MovieProvider } from '../providers/movie/movie';
import { UsersProvider } from '../providers/users/users';
import { MapsProvider } from '../providers/maps/maps';
import { GoogleMapComponent } from "../components/google-map/google-map";

import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { CoordinatesProvider } from '../providers/coordinates/coordinates';
import { OcurrencePersistenceProvider } from '../providers/ocurrence-persistence/ocurrence-persistence';

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
    RegisterPage
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
    RegisterPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieProvider,
    UsersProvider,
    MapsProvider,
    SQLite,
    Toast,
    DatabaseProvider,
    CoordinatesProvider,
    OcurrencePersistenceProvider
  ]
})
export class AppModule {}
