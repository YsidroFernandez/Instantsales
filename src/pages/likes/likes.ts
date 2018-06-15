import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { publicationProvider } from '../../providers/publication/publication';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the LikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
})
export class LikesPage {

  likes : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public publicationProvider: publicationProvider,
              public storage: Storage,
              public events: Events,) {
      
      this.likes = [];
  }

  getpublicationById(publicationId:any){ 
      //this.publicationProvider.getpublicationById(publication.idString)
      this.publicationProvider.getpublicationById(publicationId)
        .then((result) => {
          console.log(result);
          this.navCtrl.push('publicationRegisterPage', { publication: result['items'][0] },
           {animate: true, direction: 'forward'})
        }, (err) => {
          console.log(err);
        });
  }

  goProfileUser(userId){
    this.navCtrl.push('ProfilePage',{userId: userId},
    {animate: true, direction: 'forward'});
  }

  ionViewDidEnter() {
    this.storage.get('user').then((val) => {
      if(val){
        var user = JSON.parse(val);
        console.log(user);
        console.log(user.idString);
        this.userProvider.getLikesUser(user.idString)
        .then((result) => {
          console.log(result);
          this.likes= result['items'];
        }, (err) => {
          console.log(err);
        });
      }
    });  
  }
}
