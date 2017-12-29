import {OcurrenceController} from '../../providers/ocorrencias/ocurrence-controller/ocurrence-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    OcurrenceController]
})

export class FeedPage {
  
  public list_ocurrence = new Array<any>();

  private dangerousVideoUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC_k7pa4dDmktXNIdn_HiXvc0b3BYr26Vs&q=Rua+José+P.+de+Oliveira';
  private videoUrl: SafeResourceUrl;
  public loader;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private ocurrenceController: OcurrenceController,
    private sanitizer: DomSanitizer,
    private position: Geolocation,
    private toast: Toast) {
    this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);

  }

  filter = {
    "codigo_tipo_ocorrencia":""
  };
  
  ocurrenceFilter(){
    this.list_ocurrence = []
    this.presentLoading();
    let codigo = parseInt(this.filter.codigo_tipo_ocorrencia);
    this.position.getCurrentPosition().then((position) => {
      this.ocurrenceController.getOcurrencePerType(codigo).then((res) => {
        this.loadOcurrences(res, position);
      }).catch((err)=>{
        this.outLoading();
        this.toast.showLongCenter("Problema ao carregar as ocorrências, favor recarregar a página").subscribe(
          toast => {
            console.log(toast);
        });     
      })
    }).catch( err => {
      this.toast.showLongCenter("Localização indsponivel").subscribe(
        toast => {
          console.log(toast);
      });      
    });
  }

  loadOcurrences(ocurrence, position){
    let result = [];
    let lst_ocurrences = JSON.parse(JSON.stringify(ocurrence)).data;
    lst_ocurrences.forEach(element => {
      if (this.getInBound(
        parseInt(element.posicao_ocorrencia.split(",")[0].split(":")[1]), 
        parseInt(element.posicao_ocorrencia.split(",")[1].split(":")[1]), 
        position.coords.latitude, 
        position.coords.longitude)) {
          result.push(element);
      }          
    });
    if(result.length > 0){
      this.list_ocurrence = result;
      this.outLoading();
    }else{
      this.outLoading();
      
      this.toast.showLongCenter("Sem ococrências próximas a você").subscribe(
        toast => {
          console.log(toast);
      });  
    }
  }

  private toRad(Value) {
    return Value * Math.PI / 180;
  }

  private getInBound(lat1, lon1, lat2, lon2) {
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
    //return d <= 5;
    return d > 0;
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
    this.position.getCurrentPosition().then((position) => {
      this.ocurrenceController.getOcurrencesFeed().then( (ocurrence) => {
        this.loadOcurrences(ocurrence, position);
      }).catch( err => {
        this.outLoading();
        this.toast.showLongCenter("Problema ao carregar as ocorrências, favor recarregar a página").subscribe(
          toast => {
            console.log(toast);
        });      
      });;
    }).catch( err => {
      this.toast.showLongCenter("Localização indsponivel").subscribe(
        toast => {
          console.log(toast);
      });      
    });
  }
}
