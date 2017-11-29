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
    let coordinate = '{lat: -8.0645935, lng: -34.8942482}'
    this.ocurrenceData.posicao_ocorrencia = coordinate;
    this.ocurrenceData.endereco_ocorrencia = this.ocurrenceData.endereco_ocorrencia.replace(/ /g, "+");
    console.log(JSON.stringify(this.ocurrenceData));
    this.ocurrenceController.insertOcurrence(this.ocurrenceData).then((res) => {
      this.toHomePage()
      this.toast.showLongBottom("Ocorrência cadastrada com sucesso").subscribe(
        toast => {
          console.log(toast);
        });
    }).catch(err => {
      console.log(err)
    });
   /* this.position.getCurrentPosition().then((res) => {
      console.log(res);
      let lat = res.coords.latitude;
      let long = res.coords.longitude;
      let coordinate = '{"lat": ' + lat + ', "lng": ' + long + '}'
      this.ocurrenceData.posicao_ocorrencia = coordinate;
      console.log(JSON.stringify(this.ocurrenceData));
      this.ocurrenceController.insertOcurrence(this.ocurrenceData).then((res) => {
        this.toHomePage()
        this.toast.showLongBottom("Ocorrência cadastrada com sucesso").subscribe(
          toast => {
            console.log(toast);
          });
      }).catch(err => {
        alert(err)
      });
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OccurrencesPage');
  }

  public toHomePage(): void{
    this.navCtrl.push(HomePage);
  }

  public toBeforePage(): void {
    this.navCtrl.pop();
  }

}
