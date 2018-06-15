import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public publicationProvider: publicationProvider,
              public userProvider: UserProvider,
              public events: Events) {
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
        this.publicationProvider.getpublicationsFavorites(this.user.idString)
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


  goTopublication(publication:any){
    this.navCtrl.push('publicationRegisterPage',{publication : publication },
        {animate: true, direction: 'forward'});
  }
}
