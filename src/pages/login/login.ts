import { TabsPage } from './../tabs/tabs';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeforeLoginPage } from '../before-login/before-login';
import { Toast } from '@ionic-native/toast';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  userData = { "email": "", "password": "" };
  private REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  constructor(
    private uniqueDeviceID: UniqueDeviceID,
    private toast: Toast,
    private userController: UsersController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public toBeforePage(): void {
    this.navCtrl.push(BeforeLoginPage)
  }
  public toTabsPage(): void {
    this.navCtrl.push(TabsPage)
  }
 
  private validateninputsLogin(email_usuario): any {

    if (this.REGEX.test(email_usuario)){
      return true;

    }else{
      this.toast.showLongBottom("Email inválido ").subscribe(
        toast => {
          console.log(toast);
      });
      return false;
    }
  }

  login() {
    this.uniqueDeviceID.get().then((udid: any) => {

      let email_usuario = this.userData.email.toString();
      let senha_usuario = this.userData.password.toString();

      if(this.validateninputsLogin(email_usuario)){
        this.userController.verifyDevice(udid).then((res: any) => {
           if (res.data.status_log == 'not_logged') {
            this.userController.verifyUser(email_usuario,senha_usuario).then((res: any) => {
              let codigo_usuario = res.data.codigo_usuario;
             this.userController.login(codigo_usuario,udid).then( res => {
                this.toTabsPage()
                this.toast.showLongBottom("Bem vindo").subscribe(
                  toast => {
                    console.log(toast);
                });
             }).catch( err => {
               alert(err)
             })
            }).catch( err => {
              this.toast.showLongCenter("Email ou senha inválidos").subscribe(
                toast => {
                  console.log(toast);
              });
            });
          }
          
  
        }).catch((error: any) => {
          alert(error)
        });
      }
    }).catch((error: any) => {
      alert(error)
    });


    
  }
}
