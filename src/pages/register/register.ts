import {LoginPage} from '../login/login';
import {Toast} from '@ionic-native/toast';
import { BeforeLoginPage } from './../before-login/before-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userData = {"email_usuario": "", "senha_usuario": "","sexo":"","nome_usuario":"" };
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: Toast,
    private userController: UsersController) {
  }

  register(){
    let response = this.userController.createAccount(this.userData).then((res) => {
      this.toLoginPage()
      this.toast.showLongBottom("Cadastro efetuado com sucesso").subscribe(
        toast => {
          console.log(toast);
      });
    }).catch( err => {
      alert(err)
    });
  }

  public toLoginPage():void {
    this.navCtrl.push(LoginPage)
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public toBeforePage(): void {
    this.navCtrl.pop();
  }
}
