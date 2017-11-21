import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { CoordinatesProvider } from '../../providers/coordinates/coordinates';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    CoordinatesProvider  ]
})
export class FeedPage {
  public list_movies = new Array<any>();

  constructor(
    public navCtrl: NavController,                                                                                                                   
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private movitProvider: CoordinatesProvider) {
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 3000
    });
    loader.present();
  }
  ionViewDidEnter() {
    this.presentLoading();
    this.list_movies = this.movitProvider.getCoordinates();
  }
}
