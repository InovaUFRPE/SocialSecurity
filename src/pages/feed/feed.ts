import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CoordinatesProvider } from '../../providers/ocorrencias/coordinates/coordinates';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    CoordinatesProvider]
})

export class FeedPage {

  public list_movies = new Array<any>();

  private dangerousVideoUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC_k7pa4dDmktXNIdn_HiXvc0b3BYr26Vs&q=Rua+José+P.+de+Oliveira';
  private videoUrl: SafeResourceUrl;
  public loader;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private movitProvider: CoordinatesProvider,
    private sanitizer: DomSanitizer,
    private position: Geolocation,
    private toast: Toast) {
    this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);

  }


  private toRad(Value) {
    return Value * Math.PI / 180;
  }


  private getInBound(lat1, lon1, lat2, lon2) {

    let pointsToCheckInBound = this.movitProvider.getCoordinates();
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)

    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1_ = this.toRad(lat1);
    var lat2_ = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d <= 3;
  }


  getInBoundPoints() {
    let result = []
    let listToCalculate = this.movitProvider.getCoordinates();
    this.position.getCurrentPosition().then((res) => {

      listToCalculate.forEach(element => {
        if (this.getInBound(element.position.lat, element.position.lng, res.coords.latitude, res.coords.longitude)) {
          result.push(element);
        }
      });

    })
    return result;
  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });

    this.loader.present();

  }


  outLoading() {
    this.loader.dismiss();
  }

  ionViewDidEnter() {
    this.presentLoading();
    setTimeout(function () {
      this.outLoading();
    }, 5000);
    this.checkFeeder();
  }


  checkFeeder() {
    let cont = 0
    setInterval(function () {
      cont++;
      this.presentLoading();
      let promise = new Promise((resolve, reject) => {
        let result = this.getInBoundPoints();
        if (result.length <= 0) {
          setTimeout(() => {
            this.outLoading();
          }, 1000)
          setTimeout(() => {
            this.toast.showLongCenter("Nenhuma ocorrência perto de você" + cont).subscribe(
              toast => {
                console.log(toast);
              });
          }, 1500)

        } else {
          this.presentLoading();
          resolve(this.list_movies = this.getInBoundPoints());
        }
      })
      promise.then(() => {
        setTimeout(() => {
          this.outLoading();
        }, 2000)
      }).catch((err) => { alert(err) });
    }, 10000);
  }

}
