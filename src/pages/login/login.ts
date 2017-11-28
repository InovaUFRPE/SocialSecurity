import { TabsPage } from './../tabs/tabs';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeforeLoginPage } from '../before-login/before-login';
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  userData = { "email": "", "password": "" };

  constructor(private toast: Toast,private userController: UsersController, public navCtrl: NavController, public navParams: NavParams) {
  }



  private getUser() {
    this.userController.getUser(1).then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  };


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public toBeforePage(): void {
    this.navCtrl.push(BeforeLoginPage)
  }
  public toTabsPage(): void {
    this.navCtrl.push(TabsPage)
  }
  login() {
    let email_usuario = this.userData.email.toString();
    let senha_usuario = this.userData.password.toString();
    
    let response = this.userController.login(email_usuario,senha_usuario).then((res) => {
      let data = JSON.parse(JSON.stringify(res)).data;
      if(data.length > 0){
        this.toTabsPage()
        this.toast.showLongBottom("Bem vindo "+data[0].nome_usuario).subscribe(
          toast => {
            console.log(toast);
        });
      }else{
        this.toast.showLongCenter("Email ou senha inválidos").subscribe(
          toast => {
            console.log(toast);
        });
      }
    }).catch( err => {
      alert(err)
    });
  }
}
