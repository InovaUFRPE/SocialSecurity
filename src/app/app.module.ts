import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//PAGES
import { ContactPage }         from '../pages/contact/contact';
import { HomePage }            from '../pages/home/home';
import { IntroPage }           from '../pages/intro/intro';
import { LoginPage }           from '../pages/login/login';
import { BeforeLoginPage }     from '../pages/before-login/before-login';
import { OccurrencesPage }     from '../pages/occurrences/occurrences';
import { RegisterPage }        from './../pages/register/register';
import { AlertPage }           from '../pages/alert/alert';
import { ProfilePage }         from '../pages/profile/profile';
import { EditProfilePage }     from '../pages/edit-profile/edit-profile';
import { RegisterContactPage } from '../pages/register-contact/register-contact';
import { FeedPageModule }      from '../pages/feed/feed.module';

//NATIVE
import { StatusBar }      from '@ionic-native/status-bar';
import { SplashScreen }   from '@ionic-native/splash-screen';
import { GoogleMaps }     from '@ionic-native/google-maps';
import { Geolocation }    from '@ionic-native/geolocation';
import { Toast }          from '@ionic-native/toast';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { SQLite }         from '@ionic-native/sqlite';
import { Vibration }      from '@ionic-native/vibration';

//COMPONENTS
import { GoogleMapComponent } from "../components/google-map/google-map";

//PROVIDERS
import { DatabaseProvider }    from '../providers/database/database';
import { CoordinatesProvider } from '../providers/ocorrencias/coordinates/coordinates';
import { OcurrenceController } from '../providers/ocorrencias/ocurrence-controller/ocurrence-controller';
import { MapsProvider }        from '../providers/ocorrencias/maps/maps';
import { MapsStyles }          from '../providers/ocorrencias/maps/mapsStyles';
import { UsersController }     from '../providers/usuario/users-controller/users-controller';
import { ExitApp }             from '../providers/utils/exit-app';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    IntroPage,
    LoginPage,
    BeforeLoginPage,
    GoogleMapComponent,
    OccurrencesPage,
    RegisterPage,
    AlertPage,
    ProfilePage,
    EditProfilePage,
    RegisterContactPage
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
    ContactPage,
    HomePage,
    IntroPage,
    LoginPage,
    BeforeLoginPage,
    OccurrencesPage,
    RegisterPage,
    AlertPage,
    ProfilePage,
    EditProfilePage,
    RegisterContactPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    UniqueDeviceID,
    Toast,
    DatabaseProvider,
    CoordinatesProvider,
    OcurrenceController,
    MapsProvider,
    MapsStyles,
    ExitApp,
    UsersController,
    Vibration
  ]
})
export class AppModule {}
