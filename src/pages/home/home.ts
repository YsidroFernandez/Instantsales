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
              public alertCtrl: AlertController,) {

    this.publications=[];
    this.user=[];
    this.loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
  }

  goDescriptionPublication(){
    this.navCtrl.push('PublicationDescPage',
    {animate: true, direction: 'forward'});
  }

   updatepublication() {
    this.navCtrl.push('UpdateProfilePage',
    {animate: true, direction: 'forward'});
  }

  borraresto(){
    //this.navCtrl.push('AceptarFotoPage',{photo: "data:image/jpeg;base64,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"},
    //    {animate: true, direction: 'forward'});

    this.user.profilePicture="data:image/jpeg;base64,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";
    this.userProvider.updateUserPicture(this.user).then(result=>console.log(result),err=>console.log(err));
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
        console.log(this.user._id);
        this.publicationProvider.getpublications(this.user._id)
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

  doRefresh(refresher) {
    
    console.log('ionViewDidLoad HomePage');
    this.storage.get('user').then((val) => {
      if(val){
        var par = JSON.parse(val);
        this.user = par;
        console.log(this.user);
        console.log(this.user._id);
        this.publicationProvider.getpublications(this.user._id)
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
