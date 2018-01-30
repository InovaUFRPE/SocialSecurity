import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RegisterContactPage } from '../register-contact/register-contact';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { ExitApp } from '../../providers/utils/exit-app';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contato = {
    nome_contato: "",
    numero_contato: ""
  }

  constructor(
    private navCtrl:        NavController, 
    private uniqueDeviceID: UniqueDeviceID,
    private userController: UsersController,
    private exitApp: ExitApp,) {
      this.exitApp.doNothing();
      
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ContactPage');
    this.contatoInfo();
  }

  public getContato():Boolean{
    return this.contato.nome_contato == "";
  }

  public contatoInfo(): void {
    this.uniqueDeviceID.get().then(udid => {
      this.userController.verifyDevice(udid).then((res: any) => {
        if (res.data.status_log == "logged") {
          this.userController.getContact(res.data.cod_usuario).then((res: any) => {
            this.contato.nome_contato = res.data.nome_contato.split(" ")[0]
            this.contato.numero_contato = res.data.numero_contato.split(" ")[0];
          })
        }
      })
    })
  }

  public toEditContact():void{
    this.navCtrl.push(RegisterContactPage);
  }
  public toBeforePage(): void {
    this.navCtrl.pop();
  }
}
