import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeforeLoginPage } from '../before-login/before-login';
import { StatusBar } from '@ionic-native/status-bar';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { ExitApp } from '../../providers/utils/exit-app';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers: [
    ExitApp]
})
export class IntroPage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private statusBar: StatusBar,
    private userController: UsersController,
    private uniqueDeviceID: UniqueDeviceID,
    private exitApp: ExitApp,) {
      this.exitApp.exitApp();

  }

  ionViewDidLoad() {}

  public toNextPage(): void {
    this.uniqueDeviceID.get().then((udid: any) => {
      this.userController.verifyDevice(udid).then( (res: any) => {
        if(res.data.status_log == "logged"){
          this.navCtrl.setRoot(HomePage);
        }else{
          this.navCtrl.setRoot(BeforeLoginPage);
        }
      }).catch( err => {
        this.navCtrl.setRoot(BeforeLoginPage);
      })
    });
  }

}
