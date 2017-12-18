import { LoginPage } from '../login/login';
import { Toast } from '@ionic-native/toast';
import { BeforeLoginPage } from './../before-login/before-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userData = { "email_usuario": "", "senha_usuario": "", "sexo": "", "nome_usuario": "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    private userController: UsersController,
    private toastCtrl: ToastController) { }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  
  register() {
    if (this.validarNome() == false){
      this.presentToast("Digite seu nome")
      return;
    }
    if (this.validarEmail() != true) {
      this.presentToast("Email incorreto")
      return;
    }
    if (this.validarSenha() == false){
      this.presentToast("Digite uma senha com mais 5 dígitos")
      return;
    }
    
    if (this.validarSexo() == false){
      this.presentToast("Informe seu sexo")
      return;
    }
    let response = this.userController.createAccount(this.userData).then((res) => {
        this.toLoginPage()
    })
  
  }
  validarEmail(): boolean {
      var emailUser = this.userData.email_usuario;
      var regexp = new RegExp('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
      var test = regexp.test(emailUser);
      if (test == true) {
        return true;
      }
    }

  validarNome(): boolean{
    var nomeUser = this.userData.nome_usuario;
    if (nomeUser.length < 3){
      return false;
    }
  }

  validarSexo():boolean{
    var sexoUser = this.userData.sexo;
    if (sexoUser == "" || sexoUser == null){
      return false;
    }
  }
  validarSenha():boolean{
    var senhaUser = this.userData.senha_usuario;
    if (senhaUser.length < 5){
      return false;
    }
  }
  public toLoginPage(): void {
    this.navCtrl.push(LoginPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public toBeforePage(): void {
    this.navCtrl.pop();
  }
}
