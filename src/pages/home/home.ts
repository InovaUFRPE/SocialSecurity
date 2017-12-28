import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OccurrencesPage } from '../occurrences/occurrences';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { Toast } from '@ionic-native/toast';
import { BeforeLoginPage } from '../before-login/before-login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user = {
    name: "Entrar"
  }
  options: any = {
    controls: {
      compass: false,
      myLocationButton: true,
      indoorPicker: true,
      zoom: true
    }
  };

  constructor(
    private navCtrl: NavController,
    private toast: Toast,
    private navParams: NavParams,
    private uniqueDeviceID: UniqueDeviceID,
    private userController: UsersController) {
      this.uniqueDeviceID.get().then( udid => {
        this.userController.verifyDevice(udid).then( (res: any) => {
          if(res.data.status_log == "logged"){
            this.userController.getUser(res.data.cod_usuario).then( (res: any) => {
              this.user.name = res.data.nome_usuario.split(" ")[0]
            })
          }
        })
      })
  }

  onMapClick(e) {
    console.log('map was clicked', e);
  }

  onMapReady(e) {
    console.log('map is ready', e);
  }

  public toRegisterPage(): void {
    this.uniqueDeviceID.get().then( udid => {
      this.userController.verifyDevice(udid).then( (res: any) => {
        if(res.data.status_log == "logged"){
          this.navCtrl.push(OccurrencesPage)
        }
        else{
          this.toast.showLongBottom("Por favor, antes de inserir uma ocorrência realize o login").subscribe(
            toast => {
              console.log(toast);
          });
        }
      }).catch( err => {
        this.toast.showLongBottom("Por favor, antes de inserir uma ocorrência realize o login").subscribe(
          toast => {
            console.log(toast);
        });
      })
    })


  }

  public toProfilePage():void{
    this.navCtrl.push(ProfilePage)
  }

  public openLoginPage():void{
    this.navCtrl.push(LoginPage)
  }

  public toBeforeLoginPage():void{
    this.navCtrl.push(BeforeLoginPage)
  }

  public logout():void{
    this.uniqueDeviceID.get().then((udid: any) => {
      this.userController.logout(udid);
      this.toBeforeLoginPage();
    });
  }
}
