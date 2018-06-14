import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CauseProvider } from '../../providers/cause/cause';
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
  causes: any;
  many: boolean;
  user: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public causeProvider: CauseProvider,
              public userProvider: UserProvider,
              public events: Events) {
    this.causes = [];
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
        this.causeProvider.getCausesFavorites(this.user.idString)
        .then((result) => {
          console.log(result);
          this.causes= result['items'];
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


  goToCause(cause:any){
    this.navCtrl.push('CauseRegisterPage',{cause : cause },
        {animate: true, direction: 'forward'});
  }
}
