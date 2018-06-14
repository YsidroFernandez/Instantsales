import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
//import { CauseCreatePage } from '../cause-create/cause-create';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild("menuTabs") menuTabs: Tabs;
  badge : string;
  userId: any;
  public areNewLikes: boolean;
  public ic_notification: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider : UserProvider,
              public storage : Storage,
              public events : Events
              ) {
    
    this.badge = '';
    this.areNewLikes= false;
    this.ic_notification = "ic_notification";
  }

  ionViewDidEnter() {
    let areNewLikes;
    this.storage.get('user').then((val) => {
      console.log(val);
        if(val){
          this.userId=JSON.parse(val).idString;
          areNewLikes = setInterval(()=>{
            this.userProvider.areNewLikes(this.userId)
              .then((result) => {
                if(result['status']){
                  this.ic_notification = "ic_notification_action";
                  console.log('nueva forma arelikes');
                }else{
                  this.ic_notification="ic_notification";
                  console.log('nueva forma not_arelikes');
                }
              }, (err) => {
                console.log(err);
              });
            }, 5000);}
      });  

    this.events.subscribe('logout',()=>{clearInterval(areNewLikes)});
  }

  mySelectedIndex: number;

  tab1root= 'HomePage';
  tab2root='ExplorePage';
  tab3root='CauseCreatePage';
  tab4root='NotificationsPage';
  tab5root='LikesPage';

}
