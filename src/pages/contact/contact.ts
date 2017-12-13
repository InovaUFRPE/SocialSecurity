import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  public toProfilePage():void{
    this.navCtrl.pop()
  }

  public saveContact():void{
    /* Aqui função que salva contato */
    this.navCtrl.pop()

  }

}
