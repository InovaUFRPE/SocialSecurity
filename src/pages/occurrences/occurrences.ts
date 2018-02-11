import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcurrenceController } from '../../providers/ocorrencias/ocurrence-controller/ocurrence-controller';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from '../../providers/ocorrencias/maps/maps';
import { ExitApp } from '../../providers/utils/exit-app';

@IonicPage()
@Component({
  selector: 'page-occurrences',
  templateUrl: 'occurrences.html',
})
export class OccurrencesPage {
  @ViewChild('map') mapRef: ElementRef;
  ocurrenceData = {
    "codigo_tipo_ocorrencia": "",
    "codigo_usuario": 1,
    "titulo_ocorrencia": "",
    "endereco_ocorrencia": "",
    "posicao_ocorrencia": "",
    "hora_ocorrencia": "",
    "data_ocorrencia": "",
    "boletim_ocorrencia": "",
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: Toast,
    private exitApp: ExitApp,
    private position: Geolocation,
    private ocurrenceController: OcurrenceController,
    private mapsProvider: MapsProvider ) {
      this.exitApp.doNothing();
  }

  register() {
      let lat  = this.mapsProvider.getPosition().lat();
      let long = this.mapsProvider.getPosition().lng();
      let coordinate = '{"lat": ' + lat + ', "lng": ' + long + '}'
      this.ocurrenceData.posicao_ocorrencia = coordinate;
      this.ocurrenceController.insertOcurrence(this.ocurrenceData).then((res) => {
        this.toHomePage()
        this.toast.showLongBottom("Ocorrência cadastrada com sucesso").subscribe(
          toast => {
            console.log(toast);
          });

      }).catch(err => { console.log(err) });
  }

  ionViewDidLoad() {
   this.mapsProvider.showMap(this.mapRef);
  }

  public toHomePage(): void{
    this.navCtrl.setRoot(HomePage)
  }

}
