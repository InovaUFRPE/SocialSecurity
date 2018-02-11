import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';
import { AlertPage } from '../pages/alert/alert';
import { ProfilePage } from '../pages/profile/profile';
import { BeforeLoginPage } from '../pages/before-login/before-login';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = null;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#141e30');
      //splashScreen.hide();
      //Criando o banco de dados
      dbProvider.createDatabase()
      .then(() => {
        // fechando a SplashScreen somente quando o banco for criado
        this.openHomePage(splashScreen);
      })
      .catch(() => {
        // ou se houver erro na criação do banco
        this.openHomePage(splashScreen);
      });
  });
}

private openHomePage(splashScreen: SplashScreen) {
  splashScreen.hide();
  this.rootPage = IntroPage;
  }
}
