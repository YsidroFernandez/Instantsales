import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { publicationProvider } from '../../providers/publication/publication';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
  
})
export class ExplorePage {
  searchQuery: string = '';
  items: any;
   publications: any;
    user:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public publicationProvider: publicationProvider,
              public userProvider: UserProvider,
              public storage: Storage,) {
     this.publications=[];
     this.user=[];
     this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');

    this.storage.get('user').then((val) => {  
      if(val){
        var par = JSON.parse(val);
        this.user = par;
        console.log(this.user);
        console.log(this.user.idString);
        this.publicationProvider.getpublications(this.user.idString)
        .then((result) => {
          console.log(result);
          this.publications= result['items'];
          //this.loader.dismiss();
        }, (err) => {
          console.log(err);
          //this.loader.dismiss();
        });
      }
    });  
  }


initializeItems() {
   /* this.items = [
      'Computacion',
      'Celulares',
      'Ropa',
    ];*/
    this.items=this.publications;
  }
   getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
         return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //return (item);
      })
    }
  }

}
