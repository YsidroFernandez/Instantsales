import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {



  @ViewChild('passwordInput') passwordInput;
  

  isLoggedIn:boolean = false;//variables de facebook
  users: any={};
  showUser: boolean = false;
  datos: any;
user = {
    username: '',
    password:'',
    email: '',
    name: '',
    birthdate: '',
    gender: '',
    ocupation:'',
    facebook:'',
    instagram:'',
    geolocate:[],
    countpublications: 0,
    countFollowers:0,
    countFollowing:0,
    profilePicture: ''
  };
  
  idioms: any[] = [];
  private geolocate: any;

  private username: string;
  private password: string;
  private isShowedPassword: boolean = false;
  private colorEye: string = 'white';
  public loader: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private translateService: TranslateService,
              public userProvider: UserProvider,
              public storage: Storage,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private fb: Facebook,

              ) {



    this.idioms = [
      {
        value: 'es',
        label: 'Spa'
      },
      {
        value: 'en',
        label: 'Eng'
      }
    ];

    
    


     fb.getLoginStatus()//chekeo del estus de la conexion con facebook
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));

      this.geolocate = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.passwordInput);

  }

  doLogin() {
    this.translateService.get('MSG_LOADER_CONTENT').subscribe((res: string) => {
      this.loader = this.loadingCtrl.create({
        content: res
      });
      this.loader.present();
      console.log(this.username);
      console.log(this.password);
      if(this.username != '' && this.password != ''){

        this.userProvider.loginUser(this.username, this.password)

        .subscribe( data => {
          console.log(data);
          if(data['status']){
            this.storage.set('user', JSON.stringify(data['items']));
            this.loader.dismiss();
            this.navCtrl.setRoot('TabsPage');
          }
          
          
        }, error => {
          console.log(error);
          if(error.status==404)
            this.presentAlert();
          else
            this.presentAlertConex();
         
          
          this.loader.dismiss();
         
          });
        //
      }
    });
    //this.navCtrl.setRoot('TabsPage');
  }

  goToFacebook(){
   /* this.userProvider.getUser()
    .subscribe( data => {
    console.log(data);
    }, error => {
      console.log('Error');
      });*/
  }
  goToRegister(){
  	this.navCtrl.setRoot('RegisterPage');
  }
  choose(lang) {
    console.log(lang);
    this.translateService.use(lang);
  }

  presentAlert() {

    var updatedSuccess = "";
    
    this.translateService.get('MSG_UPD_SUCCESS').subscribe((res: string) => {
      updatedSuccess = res;
      //=> 'hello world'
    });


    let alert = this.alertCtrl.create({
      title: 'Incorrect Data',
      subTitle: 'Username/Email or password is incorrect',
      buttons: ['Try Again']
    });
    alert.present();
  }

  presentAlertConex() {


    let alert = this.alertCtrl.create({
      title: 'Connection Error',
      subTitle: 'Check your connection with internet',
      buttons: ['Try Again']
    });
    alert.present();
  }
  showHide(){
    this.isShowedPassword = !this.isShowedPassword;
    if(this.isShowedPassword){
      this.passwordInput.type = "text";
      this.colorEye = "light";    
    } 
    else{
      this.passwordInput.type = "password";
      this.colorEye = "white";
    }
    this.passwordInput.setFocus();
  }


loginFacebook(){

    this.loader.present();
    this.fb.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){

        this.fb.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true; 
      this.users = data;
      this.username=this.users.id;
      this.password=this.users.id;
      //inicio de codigo para registro de usuario desde credenciales de facebook



this.userProvider.loginUser(this.username, this.password)
      .subscribe( data => {
        
        console.log(data);
        if(data['status']){
          this.storage.set('user', JSON.stringify(data['items']));
          this.loader.dismiss();
          this.navCtrl.setRoot('TabsPage');
         
        }
      }, error => {
        
         this.user.username=this.users.id;
         this.user.name=this.users.name;
         this.user.password=this.users.id;
         this.user.email=this.users.email;
         this.user.gender='';
         this.user.birthdate='';
         this.user.ocupation='';
         this.user.facebook='';
         this.user.instagram='';
         this.user.profilePicture=this.users.picture.data.url;
      this.userProvider.addUserfb(this.user).then((result) => {
      
        
    this.username=this.users.id;
    this.password=this.users.id;

    this.userProvider.loginUser(this.username, this.password)
      .subscribe( data => {
        console.log(data);
        if(data['status']){
          this.storage.set('user', JSON.stringify(data['items']));
          this.loader.dismiss();
          this.navCtrl.setRoot('TabsPage');
          
        } }, error => {
        console.log(error);
        this.loader.dismiss();
        this.presentAlert();
        });
        //this.okAlert();
        //this.loader.dismiss();
      }, (err) => {
        console.log(err);
        this.presentAlert();
        this.loader.dismiss();
      });
        

        });
    })
    .catch(error =>{
      console.error( error );
      this.loader.dismiss();
    });



//fin de codigo e registro de credenciales
     
      };
    })
    .catch(error =>{
      console.error( error );
      this.loader.dismiss();
    });
  }

  getInfo(){

    
  }

  logout() {
  this.fb.logout()
    .then( res => this.showUser = false)
    .catch(e => console.log('Error logout from Facebook', e));
}


}
