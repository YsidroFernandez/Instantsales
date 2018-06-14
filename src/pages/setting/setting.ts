import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Facebook } from '@ionic-native/facebook';



/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

showUser: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public viewCtrl: ViewController,
               private fb: Facebook,
               public events : Events ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  logout(){

    this.storage.remove('user');
    this.viewCtrl.dismiss();
    this.events.publish("logout");
    this.fb.logout().then( res => this.showUser = false)
    .catch(e => console.log('Error logout from Facebook', e));
    this.navCtrl.setRoot('LoginPage');


  }

  editProfile(){
    this.navCtrl.push('EditProfilePage',
    {animate: true, direction: 'forward'});
    this.viewCtrl.dismiss();
  }

}
