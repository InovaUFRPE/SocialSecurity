import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration';


@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})


export class AlertPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private vibration: Vibration) {
  }


  ionViewDidLoad() {
    this.vibration.vibrate(8000);
  }


  public toBeforePage(): void {
    this.vibration.vibrate(0);
    this.navCtrl.pop();
  }
  

}
