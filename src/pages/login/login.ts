import {UsersController} from '../../providers/usuario/users-controller/users-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeforeLoginPage } from '../before-login/before-login';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  userData = { "username": "", "password": ""};

  constructor(private userController: UsersController, public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public toBeforePage(): void {
    this.navCtrl.push(BeforeLoginPage)
  }

  login() {
    alert('asdasd');
    let algo =  this.userController.getUser(1).then( (res) => {
      
    });
  }
}
