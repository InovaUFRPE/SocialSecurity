import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcurrenceController } from '../../providers/ocorrencias/ocurrence-controller/ocurrence-controller';
import { HomePage } from '../home/home';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-occurrences',
  templateUrl: 'occurrences.html',
})
export class OccurrencesPage {

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
    private position: Geolocation,
    private ocurrenceController: OcurrenceController ) {
  }

  register() {
   this.position.getCurrentPosition().then((res) => {

      let lat = res.coords.latitude;
      let long = res.coords.longitude;
      let coordinate = '{"lat": ' + lat + ', "lng": ' + long + '}'
      this.ocurrenceData.posicao_ocorrencia = coordinate;

      this.ocurrenceController.insertOcurrence(this.ocurrenceData).then((res) => {
        this.toHomePage()
        this.toast.showLongBottom("Ocorrência cadastrada com sucesso").subscribe(
          toast => {
            console.log(toast);
          });

      }).catch(err => { console.log(err) });
    });
  }

  ionViewDidLoad() {  }

  public toHomePage(): void{
    this.navCtrl.setRoot(HomePage);
  }

  public toBeforePage(): void {
    this.navCtrl.pop();
  }

}
