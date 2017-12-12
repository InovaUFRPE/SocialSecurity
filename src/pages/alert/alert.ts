import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad AlertPage');
    this.vibration.vibrate(8000);
  }

  public toBeforePage(): void {
    this.vibration.vibrate(0);
    this.navCtrl.pop();
  }

}
