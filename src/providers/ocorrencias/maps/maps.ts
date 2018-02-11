import { LoadingController }        from 'ionic-angular';
import { Injectable, ElementRef }   from '@angular/core';
import { Geolocation }              from '@ionic-native/geolocation';
import { Http }                     from '@angular/http';
import { MapsStyles }               from './mapsStyles';
import { AlertController }          from 'ionic-angular';
import 'rxjs/add/operator/map';

declare var google: any;
declare var map: any;

@Injectable()
export class MapsProvider {
  private loader;
  private marker: any;
  private map: any;
  private positionMarker;
  private location: any;


  constructor(
    private position:   Geolocation,
    private http:       Http,
    private styles:     MapsStyles,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
      this.presentLoading();
  }

  
  showMap(mapRef: any) {
    this.position.getCurrentPosition().then((res) => {
      let lat  = res.coords.latitude;
      let long = res.coords.longitude;
      this.location = new google.maps.LatLng(lat, long);
      const options  = { center: this.location, zoom: 15, mapTypeId: 'roadmap', styles: this.styles.getStyles() };
      this.map = new google.maps.Map(mapRef.nativeElement, options);
      this.addMarker(this.location, this.map);
      this.outLoading();
      let alert = this.alertCtrl.create({
        title: 'Selecione Local',
        subTitle: 'Clique e arraste o marcador para o local aonde deseja alertar uma ocorrência!',
        buttons: ['OK']
      });
      alert.present();
    });

  }


  public getPosition(){
    return this.marker.getPosition()
  }


  private addMarker(position, map) {
    this.marker = new google.maps.Marker({
      position,
      title: 'Arraste para selecionar o local',
      draggable:true,
      map,
      animation: google.maps.Animation.DROP
    })
    return this.marker;
  }

  
  private presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }


  private outLoading() {
    this.loader.dismiss();
  }
    
}