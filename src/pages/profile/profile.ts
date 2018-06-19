import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { publicationProvider } from '../../providers/publication/publication';
import { UserProvider } from '../../providers/user/user';
import { SettingPage } from '../setting/setting';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  option: string;
  rep: number;
  publications: any;
  many: boolean;
  user: any;
  userId: string;
  userLoggedId: string;
  ownProfile: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public publicationProvider: publicationProvider,
              public userProvider: UserProvider,
              public popoverCtrl: PopoverController,
              public events: Events
              ) {
    this.publications = [];
    this.ownProfile = true;
    this.many = true;
    this.user = [];
    this.userId = navParams.get('userId');
    console.log('userId');
    console.log(this.userId);
    console.log(navParams);
    this.option="sales";
    this.rep=80;
  }

  ionViewDidEnter(){
    this.fetchProfile();
       
  }

  ionViewDidLoad(){
    this.events.subscribe('updateProfile', () => {
      this.fetchProfile();
    });  
  }

  fetchProfile(){
    this.storage.get('user').then((val) => {
      if(val){
        var par = JSON.parse(val);
        console.log(par);
        this.userLoggedId = par._id;
        console.log(this.userId)
        console.log(this.userLoggedId);
        if(this.userId == this.userLoggedId || this.userId == ''){  
          
          this.userProvider.getUser(this.userLoggedId, this.userLoggedId)
            .then((result) => {
              console.log(result);
              this.user= result['items'];
              this.ownProfile = true;
              console.log(this.user);
              this.publicationProvider.getpublicationsUser(this.user._id, this.user._id)
                .then((result) => {
                  console.log(result);
                  this.publications= result['items'];
                }, (err) => {
                  console.log(err);
              });
            }, (err) => {
              console.log(err);
          });
          
        }else{
          this.userProvider.getUser(this.userId, this.userLoggedId)
            .then((result) => {
              console.log(result);
              this.user= result['items'];
              this.ownProfile = false;
              console.log(this.user);
              this.publicationProvider.getpublicationsUser(this.userLoggedId,this.user._id)
                .then((result) => {
                  console.log(result);
                  this.publications= result['items'];
                }, (err) => {
                  console.log(err);
              });
            }, (err) => {
              console.log(err);
          });
        }
      }
    });
  }

  selectMany(many){
    this.many = many == 'many';
  }

  goToFollowers(){
    if(this.userId != ''){
      this.navCtrl.push('FollowersPage',{userId: this.userId},
                        {animate: true, direction: 'forward'});
    }else{
      this.navCtrl.push('FollowersPage',{userId: this.user._id},
                        {animate: true, direction: 'forward'});
    }
    
  }

  goToFollowing(){
    if(this.userId != ''){
      this.navCtrl.push('FollowingPage',{userId: this.userId},
                        {animate: true, direction: 'forward'});
    }else{
      this.navCtrl.push('FollowingPage',{userId: this.user._id},
                        {animate: true, direction: 'forward'});
    }
  }
  
  openSetting(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(SettingPage);
    popover.present({
      ev: myEvent
    });
  }

  viewProfile(){
    this.navCtrl.push('EditProfilePage',{userId: this.user._id},
                        {animate: true, direction: 'forward'});
  }

  follow(){
    this.userProvider.addFollower(this.userLoggedId,this.user._id)
      .then((result) => {
          console.log(result);
          this.user.isFollowed = true;
          this.user.countFollowers = this.user.countFollowers +1;
        }, (err) => {
          console.log(err);
      });
  }

  goTopublication(publication:any){
    publication = {...publication, userPhoto: this.user.profilePicture};
    this.navCtrl.push('publicationRegisterPage',{publication : publication },
        {animate: true, direction: 'forward'});
  }

  unFollow(){
  this.userProvider.deleteFollower(this.userLoggedId,this.userId)
    .then((result) => {
        console.log(result);
        this.user.isFollowed = false;
        this.user.countFollowers--;
      }, (err) => {
        console.log(err);
    });
  }

  like(i){
    var like = {"userId": this.user._id,
                "publicationId": this.publications[i]._id,
                "userPublicationId": this.publications[i].userId._id,};
    this.publicationProvider.addLike(like)
    .then((result) => {
      console.log(result);
      this.publications[i].liked = true;  
    }, (err) => {
      console.log(err);
    });

  }
  unlike(i){
    var like = {"userId": this.user._id,
                "publicationId": this.publications[i]._id};
    this.publicationProvider.unlike(like)
    .then((result) => {
      console.log(result);
      this.publications[i].liked = false;  
    }, (err) => {
      console.log(err);
    });
  }

  addFavorite(i){
    var favorite = {"userId": this.user._id,
                "publicationId": this.publications[i]._id};
    this.publicationProvider.addFavorite(favorite)
    .then((result) => {
      console.log(result);
      this.publications[i].favorited = true;  
    }, (err) => {
      console.log(err);
    });
  }

  deleteFavorite(i){
    var favorite = {"userId": this.user._id,
                "publicationId": this.publications[i]._id};
    this.publicationProvider.deleteFavorite(favorite)
    .then((result) => {
      console.log(result);
      this.publications[i].favorited = false;  
    }, (err) => {
      console.log(err);
    });
  }

}
