import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FollowersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage {

  userId: string;
  userIdLogged: string;
  followers:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public storage: Storage,
              public events: Events) {
                
    this.userId = navParams.get('userId');
    this.followers = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersPage');
  }
  ionViewDidEnter(){
    
    this.storage.get('user').then((val) => {
      if(val){
        var par = JSON.parse(val);
        this.userIdLogged = par._id;
        this.userProvider.getFollowers(this.userId, this.userIdLogged)
          .then((result) => {
            console.log(result);
            this.followers = result['items'];
          }, (err) => {
            console.log(err);
        });
      }
    });
  }

  follow(i){
    this.userProvider.addFollower(this.userIdLogged,this.followers[i]._id)
      .then((result) => {
          console.log(result);
          this.followers[i].isFollowed = true;
        }, (err) => {
          console.log(err);
      });
    
  }

  unFollow(i){
    this.userProvider.deleteFollower(this.userIdLogged,this.followers[i]._id)
      .then((result) => {
          console.log(result);
          //this.following[i].isFollowe = true;
          this.followers[i].isFollowed = false;
        }, (err) => {
          console.log(err);
      });
  }
  goProfileUser(userId){
    this.navCtrl.push('ProfilePage',{userId: userId},
    {animate: true, direction: 'forward'});
  }

}
