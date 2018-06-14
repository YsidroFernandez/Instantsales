import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FollowingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {
  
  userId: string;
  userIdLogged: string;
  following: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public storage: Storage,
              public events: Events,) {
    this.userId = this.navParams.get('userId');
    this.following = [];
  }

  ionViewDidLoad() {
    
    this.storage.get('user').then((val) => {
      if(val){
        var par = JSON.parse(val);
        this.userIdLogged = par.idString;
    
        console.log('ionViewDidLoad FollowingPage');
        this.userProvider.getFollowing(this.userId)
            .then((result) => {
              console.log(result);
              this.following = result['items'];
              
            }, (err) => {
              console.log(err);
        });
      }
    });
  }
  goProfileUser(userId){  
    this.navCtrl.push('ProfilePage',{userId: userId},
    {animate: true, direction: 'forward'});
  }

  unFollow(i){
    this.userProvider.deleteFollower(this.userId,this.following[i].idString)
      .then((result) => {
          console.log(result);
          //this.following[i].isFollowe = true;
          this.following.splice(i, 1);
        }, (err) => {
          console.log(err);
      });
  }
}
