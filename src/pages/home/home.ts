import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { publicationProvider } from '../../providers/publication/publication';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  publications: any;
  user:any;
  public loader: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public publicationProvider: publicationProvider,
              public userProvider: UserProvider,
              public events: Events,
              public storage: Storage,

              private loadingCtrl: LoadingController,
              private socialSharing: SocialSharing,
              public platform: Platform,
              public actionsheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {

    this.publications=[];
    this.user=[];
    this.loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
  }

   updatepublication() {
    this.navCtrl.push('UpdateProfilePage',
    {animate: true, direction: 'forward'});
  }

  goTopublication(publication:any){
    this.navCtrl.push('publicationRegisterPage',{publication : publication },
        {animate: true, direction: 'forward'});
  }

  ionViewDidEnter() {
    //this.loader.present();
    console.log('ionViewDidLoad HomePage');
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

  goProfileUser(userId){
    this.navCtrl.push('ProfilePage',{userId: userId},
    {animate: true, direction: 'forward'});
  }
  goExplorePage(){
    this.navCtrl.push('ExplorePage',
    {animate: true, direction: 'forward'});
  }

  like(i){
    var like = {"userId": this.user.idString,
                "causeId": this.publications[i].idString,
                "userpublicationId": this.publications[i].userId,
                "viewed": false};
    this.publicationProvider.addLike(like)
    .then((result) => {
      console.log(result);
      this.publications[i].liked = true;  
    }, (err) => {
      console.log(err);
    });

  }
  unlike(i){
    var like = {"userId": this.user.idString,
                "causeId": this.publications[i].idString};
    this.publicationProvider.unlike(like)
    .then((result) => {
      console.log(result);
      this.publications[i].liked = false;  
    }, (err) => {
      console.log(err);
    });
  }

  addFavorite(i){
    var favorite = {"userId": this.user.idString,
                "causeId": this.publications[i].idString};
    this.publicationProvider.addFavorite(favorite)
    .then((result) => {
      console.log(result);
      this.publications[i].favorited = true;  
    }, (err) => {
      console.log(err);
    });
  }

  deleteFavorite(i){
    var favorite = {"userId": this.user.idString,
                "causeId": this.publications[i].idString};
    this.publicationProvider.deleteFavorite(favorite)
    .then((result) => {
      console.log(result);
      this.publications[i].favorited = false;  
    }, (err) => {
      console.log(err);
    });
  }

  doRefresh(refresher) {
    
    console.log('ionViewDidLoad HomePage');
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
          
        }, (err) => {
          console.log(err);
          
        });
      }
    });
  }


facebookShare(des:string, img: string){//se le colocan estos 2 parametros para especificar una descripcion o un grpo de imagenes
   this.loader.present();
    this.socialSharing.shareViaFacebook(des, img, null).then(() => {
      this.loader.dismiss();
// Sharing via facebook is possible
}).catch(() => {
  this.loader.dismiss();
    this.showAlert();
    // Sharing  is not possible
});
  }

twitterShare(des:string, img: string){
  this.loader.present();
  this.socialSharing.shareViaTwitter(des,img , null).then(() => {
    this.loader.dismiss();
// Sharing via twitter is possible
}).catch(() => {
    this.loader.dismiss();
    this.showAlert();// Sharing  is not possible
});
}
regularShare(des:string, img: string){// 
  this.loader.present();
  this.socialSharing.share(des, null,img, null).then(() => {//primer parametro un mensaje, el segundo es una asunto, el tercero una imagen que puede ser string o arreglo
  this.loader.dismiss();// Sharing  is possible
}).catch(() => {
    this.loader.dismiss();
    this.showAlert();
});
}
whatsappShare(des:string, img: string){
    this.loader.present();
   this.socialSharing.shareViaWhatsApp(des, img, null).then(() => {
    this.loader.dismiss();
// Sharing via whatsapp is possible
}).catch((error) => {
   this.loader.dismiss();
   this.showAlert();
});
 }

instagramShare(des:string, img: string){
  this.loader.present();
  this.socialSharing.shareViaInstagram(des, img).then(() => {
    this.loader.dismiss();
// Sharing via instagram si possible
}).catch(() => {
  this.loader.dismiss();
    this.showAlert();// Sharing is not possible
});
 
}
saveShare(img: string){
  /*this.photoLibrary.saveImage(img,"Instantpublication", null).then(() => {
    // saving
    }).catch((error) => {
        this.showAlert();
    });*/
 
}

showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Sharing is not possible: conexion error',
      buttons: ['OK']
    });
    alert.present();
  }



  

  openMenuShare(des:string, img: string) {
    let actionSheet = this.actionsheetCtrl.create({
      //title: 'Social Share',
      
      
      buttons: [
        {
          text: 'Facebook',
         
          icon: !this.platform.is('ios') ? 'logo-facebook' : null,
          handler: () => {
            this.facebookShare(des,img);
          }
        },
        {
          text: 'Instagram',
         
          icon: !this.platform.is('ios') ? 'logo-instagram' : null,
          handler: () => {
            this.instagramShare(des, img);
          }
        },
        {
          text: 'Twitter',
         
          icon: !this.platform.is('ios') ? 'logo-twitter' : null,
          handler: () => {
            this.twitterShare(des, img);
          }
        },
        {
          text: 'Whatsapp',
          
          icon: !this.platform.is('ios') ? 'logo-whatsapp' : null,
          handler: () => {
            this.whatsappShare(des, img);
          }
        },
        {
          text: 'Other',
         
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.regularShare(des,img);
          }
        },
       /* {
          text: 'Save Photo',
          icon: !this.platform.is('ios') ? 'md-download' : null,
          handler: () => {
            this.saveShare(img);
          }
        },*/
        {
          text: 'Cancel',
         
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
