import { AlertController , Platform, IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Component }       from '@angular/core';
import { OccurrencesPage } from '../occurrences/occurrences';
import { ProfilePage }     from '../profile/profile';
import { LoginPage }       from '../login/login';
import { UniqueDeviceID }  from '@ionic-native/unique-device-id';
import { UsersController } from '../../providers/usuario/users-controller/users-controller';
import { ExitApp }         from '../../providers/utils/exitApp';
import { Toast }           from '@ionic-native/toast';
import { BeforeLoginPage } from '../before-login/before-login';
import { Refresher }       from 'ionic-angular/components/refresher/refresher';
import { FeedPage }        from '../feed/feed';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})


export class HomePage {
  private user = { name: "Entrar" }
  options: any = {
    controls: {
      compass: false,
      myLocationButton: true,
      indoorPicker: true,
      zoom: true
    }
  };
  

  constructor(
    public  app: App,
    private navCtrl: NavController,
    private toast: Toast,
    private navParams: NavParams,
    private uniqueDeviceID: UniqueDeviceID,
    private userController: UsersController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private exitApp: ExitApp,
    private push: Push    ) {
      this.getUDID();
      this.exitApp.exitApp();
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('Tem permissão');

            const options: PushOptions = {
              android: {},
              ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
              },
              windows: {},
              browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
              }
            };

            const pushObject: PushObject = this.push.init(options);

            pushObject.on('notification').subscribe((notification: any) => {
              alert(notification.message);
            });

            pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

            pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

          } else {
            console.log('Não tem permissão');
          }

        });
     
  }

  /*

  //tentar atualizar a pagina de home

  ionViewWillEnter(){
    setTimeout(function () {
      this.appCtrl.getRootNav().setRoot(this);
      window.location.reload();
    }, 5000);
  }
  */
  

  private getUDID(){
    this.uniqueDeviceID.get()
    .then( udid => {
      this.userController.verifyDevice(udid)
      .then( (res: any) => {
        if(res.data.status_log == "logged"){
          this.userController.getUser(res.data.cod_usuario).then( (res: any) => {
            this.user.name = res.data.nome_usuario.split(" ")[0]
          })
        }
        })
  })
  }
  

  onMapClick(e) { console.log('map was clicked', e) }
  onMapReady(e) { console.log('map is ready',    e) }


  public getNome():Boolean{
    return !(this.user.name == "Entrar");
  }


  private needLogin(){
    this.toast.showLongBottom("Por favor, antes de inserir uma ocorrência realize o login").subscribe(
      toast => {
        console.log(toast);
    });
  }


  public toRegisterPage(): void {
    this.uniqueDeviceID.get().then( udid => {
      this.userController.verifyDevice(udid).then( (res: any) => {
        if(res.data.status_log == "logged"){
          this.app.getRootNav().setRoot(OccurrencesPage)
        }
        else{
          this.needLogin()
        }
      }).catch( err => {
        this.needLogin()
      })
    })


  }


  public toProfilePage():void{
    this.app.getRootNav().setRoot(ProfilePage)
  }


  public toBeforeLoginPage():void{
    this.app.getRootNav().setRoot(BeforeLoginPage)
  }

  public toFeedPage():void{
    this.app.getRootNav().setRoot(FeedPage)
  }

  public logout():void{
    this.uniqueDeviceID.get().then((udid: any) => {
      this.userController.logout(udid);
      this.toBeforeLoginPage();
    });
  }


}
