import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AceptarFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aceptar-foto',
  templateUrl: 'aceptar-foto.html',
})
export class AceptarFotoPage {
	photo: string




  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.photo=this.navParams.get('photo');
  }

  cancelar(){
  	this.navCtrl.pop();
  }

  aceptar(){
  	this.navCtrl.push('publicationRegisterPage',{photo: this.photo},
        {animate: true, direction: 'forward'});
  }

}
