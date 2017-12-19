import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OccurrencesPage } from '../occurrences/occurrences';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  options: any = {
    controls: {
      compass: false,
      myLocationButton: true,
      indoorPicker: true,
      zoom: true
    }
  };

  onMapClick(e) {
    console.log('map was clicked', e);
  }

  onMapReady(e) {
    console.log('map is ready', e);
  }

  public toRegisterPage(): void {
    this.navCtrl.push(OccurrencesPage)
  }

  public toProfilePage():void{
    this.navCtrl.push(ProfilePage)
  }

  public openLoginPage():void{
    this.navCtrl.push(LoginPage)
  }
}
