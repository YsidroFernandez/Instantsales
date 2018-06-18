import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-publication-desc',
  templateUrl: 'publication-desc.html',
})
export class PublicationDescPage {

   pet: string = "publicacion";
   isAndroid: boolean = false;

   imagenes: Array<string> = ["assets/imgs/computadora.jpg","assets/imgs/computadora.jpg","assets/imgs/computadora.jpg"];
   publicacion: any = 
    {
      title: "Computers I7",
      description: "Memoria Ram de 4 Gb, disco duro de un tera, fuente de poder de 500 watts",
      precio: 339999990000,
      existencia: 30,
    }  

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationDescPage');
  }

   goPublicationDesc(){
    this.navCtrl.push('PublicationDescPage',{},
    {animate: true, direction: 'forward'});
  }

}
