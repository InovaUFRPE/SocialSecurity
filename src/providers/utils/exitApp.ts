import { AlertController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ExitApp {
  constructor(
      private platform:  Platform,
      private alertCtrl: AlertController) {}
      
            
  public exitApp(){
    this.platform.ready().then(() => {
      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      this.platform.registerBackButtonAction(() => {
        this.showMessage();
      });
    });
  
  }


  private showMessage(){
    let confirm = this.alertCtrl.create({
      title: 'Deseja sair do SocialSecurity?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }
}
