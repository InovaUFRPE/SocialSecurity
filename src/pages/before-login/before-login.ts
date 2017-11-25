import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from './../register/register';


@IonicPage()
@Component({
  selector: 'page-before-login',
  templateUrl: 'before-login.html',
})
export class BeforeLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  public toLoginPage():void {
    this.navCtrl.push(LoginPage)
  }
  public toTabsPage():void {
    this.navCtrl.push(TabsPage)
  }
  public toRegisterPage():void{
    this.navCtrl.push(RegisterPage)
  }
}
