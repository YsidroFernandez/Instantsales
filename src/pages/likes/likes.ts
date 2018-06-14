import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CauseProvider } from '../../providers/cause/cause';

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
              public causeProvider: CauseProvider,
              public storage: Storage,
              public events: Events,) {
      
      this.likes = [];
  }

  getCauseById(causeId:any){ 
      //this.causeProvider.getCauseById(cause.idString)
      this.causeProvider.getCauseById(causeId)
        .then((result) => {
          console.log(result);
          this.navCtrl.push('CauseRegisterPage', { cause: result['items'][0] },
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
