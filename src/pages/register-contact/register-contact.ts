import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { ContactPage } from '../contact/contact';

@IonicPage()
@Component({
  selector: 'page-register-contact',
  templateUrl: 'register-contact.html',
})
export class RegisterContactPage {

  contato = {
    "nome_contato": "",
    "numero_contato": ""
  }

  contato_usurario = {"cod_usuario": 0};

  user = { "codigo_usuario": 0 };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private uniqueDeviceID: UniqueDeviceID,
    private userController: UsersController) {
      
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter RegisterContactPage');
    this.contatoInfo();
  }

  public getContato():Boolean{
    let condition = this.contato_usurario.cod_usuario == 0;
    return condition;
  }

  public contatoInfo(): void {
    this.uniqueDeviceID.get().then(udid => {
      this.userController.verifyDevice(udid).then((res: any) => {
        if (res.data.status_log == "logged") {
          this.user.codigo_usuario = res.data.cod_usuario
          this.userController.getContact(res.data.cod_usuario).then((res: any) => {
            this.contato_usurario.cod_usuario = res.data.cod_usuario
            this.contato.nome_contato = res.data.nome_contato.split(" ")[0]
            this.contato.numero_contato = res.data.numero_contato.split(" ")[0];
          })
        }
      })
    })
  }

  public toContactPage(): void {
    this.navCtrl.pop()
  }

 
  public newContact(): void {
    this.contato["cod_usuario"] = this.user.codigo_usuario;
    this.userController.createContact(this.contato);
    this.navCtrl.pop()
  }

  public saveContact():void{
    this.userController.updateContact(this.contato_usurario.cod_usuario,this.contato);
    this.navCtrl.pop()
  }

}
