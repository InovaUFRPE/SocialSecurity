import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { ProfilePage } from '../profile/profile';
import { ExitApp } from '../../providers/utils/exit-app';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: []
})
export class EditProfilePage {

  user = {codigo_usuario: 0};
  userData = { "email_usuario": "", "senha_usuario": "", "nome_usuario": "" };

  constructor(
    private navCtrl       : NavController, 
    private navParams     : NavParams,
    private exitApp       : ExitApp,
    private uniqueDeviceID: UniqueDeviceID,
    private userController: UsersController) {
      this.exitApp.doNothing();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter EditProfilePage');
    this.userInfo();
  }

  public userInfo(): void {
    this.uniqueDeviceID.get().then(udid => {
      this.userController.verifyDevice(udid).then((res: any) => {
        if (res.data.status_log == "logged") {
          this.userController.getUser(res.data.cod_usuario).then((res: any) => {
            this.user.codigo_usuario = res.data.codigo_usuario
            this.userData.nome_usuario = res.data.nome_usuario.split(" ")[0]
            this.userData.email_usuario = res.data.email_usuario.split(" ")[0]
            this.userData.senha_usuario = res.data.senha_usuario.split(" ")[0];
          })
        }
      })
    })
  }

  public toProfilePage(): void {
    this.navCtrl.pop()
  }

  public attProfile(): void {
    this.userController.updateUser(this.user.codigo_usuario, this.userData)
    this.navCtrl.pop()
  }
  public toBeforePage():void{
    this.navCtrl.pop();
  }
}
