import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component }    from '@angular/core';
import { LoginPage }    from '../login/login';
import { RegisterPage } from './../register/register';
import { ExitApp }      from '../../providers/utils/exit-app';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-before-login',
  templateUrl: 'before-login.html',
  providers: [
    ExitApp]
})


export class BeforeLoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private exitApp: ExitApp) {
      this.exitApp.exitApp();

  }


  ionViewDidLoad() {
  }


  public toLoginPage():void {
    this.navCtrl.push(LoginPage)
  }

  
  public toTabsPage():void {
    this.navCtrl.push(HomePage)
  }


  public toRegisterPage():void{
    this.navCtrl.push(RegisterPage)
  }

  
}
