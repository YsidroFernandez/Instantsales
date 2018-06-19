import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { publicationProvider } from '../../providers/publication/publication';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  count : number;
  publications: any;
  many: boolean;
  user: any;
  loader : any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public publicationProvider: publicationProvider,
              public userProvider: UserProvider,
              public events: Events,
              private loadingCtrl: LoadingController) {
    this.publications = [];
    this.user = [];
    this.many = true;
  }

  ionViewDidLoad() {
    
    
  }
  ionViewDidEnter(){
   
    console.log('enter at every tab change');
    this.storage.get('user').then((val) => {
      if(val){
        var par = JSON.parse(val);
        this.user = par;
        this.publicationProvider.getpublicationsFavorites(this.user._id)
        .then((result) => {
          console.log(result);
          this.publications= result['items'];
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  selectMany(many){
    if (many == 'many') {
      this.many = true;
    }else{
      this.many = false;
      console.log('false');
    }
    console.log(many);
  }

  goProfileUser(userId){
    this.navCtrl.push('ProfilePage',{userId: userId},
    {animate: true, direction: 'forward'});
  }
  goExplorePage(){
    this.navCtrl.push('ExplorePage',
    {animate: true, direction: 'forward'});
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
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
    var favorite = {"userId": this.user._id,
                "publicationId": this.publications[i]._id};
    this.publicationProvider.deleteFavorite(favorite)
    .then((result) => {
      console.log(result);
      this.publications.splice(i,1);
      this.loader.dismiss();
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
    });
  }

  goTopublication(publication:any){
    this.navCtrl.push('publicationRegisterPage',{publication : publication },
        {animate: true, direction: 'forward'});
  }
}
