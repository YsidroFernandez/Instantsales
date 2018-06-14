import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CauseProvider } from '../../providers/cause/cause';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-cause-create',
  templateUrl: 'cause-create.html',
})
export class CauseCreatePage {

   base64Image:any;

  path:string;
  flash: boolean = false;
  photo: string = 'a';
  photooriginal: string
  description: string;
  name: string;
  user: any;
  userId: any;
  loader: any;
  icons: string = "camera";

  readonly cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 100,
    width: window.screen.width,
    height: window.screen.width,
    camera: 'rear',
    tapPhoto: false,
    previewDrag: true,
    toBack: true,
    alpha: 0.5
  };

  readonly pictureOpts: CameraPreviewPictureOptions = {
    width: 640,
    height: 640,
    quality: 100
  };  

  readonly cameraPreviewDimensions: CameraPreviewDimensions = {
    width: window.screen.width,
    height: window.screen.width
  };

  ionViewWillLeave(){
    this.cameraPreview.stopCamera();  
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public causeProvider: CauseProvider,
              public userProvider: UserProvider,
              public storage: Storage,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private cameraPreview: CameraPreview,
              public crop: Crop,
              public camera: Camera,
            ) {
    //this.photo=  navParams.get('photo');
    this.icons = 'camera';


    this.path = "";

    this.user = [];
    this.userId = {"userId": ""};
    this.loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
  }

// Acceder a Galería con el plugin nativo camera
 accessGallery(){
  this.cameraPreview.stopCamera();

   let option = {

      quality:100,
      targetHeight: window.screen.width,
      targetWidth: window.screen.width,
    };

   this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.FILE_URI,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG
    }).then((imageData) => {
      this.crop.crop(imageData, option).then(newImageUrl => {
        let image = new Image();
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        image.src = newImageUrl;
        image.onload = ()=>{
          canvas.width = image.width;
          canvas.height = image.width;
          ctx.drawImage(image,
              0, 0,           
              image.width, image.height,    
              0, 0,                               
              image.width, image.height);
          let cropped_img_base64 = canvas.toDataURL();
          this.navCtrl.push('CauseRegisterPage',{photo: cropped_img_base64},
          {animate: true, direction: 'forward'});
        }
      }, error => alert(error));
     }, (err) => {
      alert(err);
    });
    this.icons = 'camera';
  }

// Acceder a galeria con photo library





  ionViewDidEnter() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
        //this.cameraPreview.setPreviewSize(this.cameraPreviewDimensions)
      },
      (err) => {
        console.log(err)
      });
    let height = window.screen.height-100-window.screen.width;
    document.getElementById("id").style.height=height+"px";
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Created Cause',
      buttons: ['Ok']
    });
    alert.present();
    this.viewCtrl.dismiss();
  }

  takePhoto(){
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
        this.cropPhoto(imageData);
      }, (err) => {
        console.log(err);
      });
  }

  cropPhoto(image64:string){
    let image = new Image();

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    image.src = 'data:image/png;base64,' + image64;
    image.onload = ()=>{
        canvas.width = image.width;
        canvas.height = image.width;

        ctx.drawImage(image,
            0, 100,           
            image.width, image.width,    
            0, 0,                               
            image.width, image.width);

        let cropped_img_base64 = canvas.toDataURL();
        this.navCtrl.push('AceptarFotoPage',{photo: cropped_img_base64},
        {animate: true, direction: 'forward'});
    }
  }

  setFlash(){
    this.flash=!this.flash;
    this.cameraPreview.setFlashMode(this.flash?"on":"off");
    
  }
  iconFlash(){
    return this.flash?"ios-flash":"ios-flash-outline";
  }
  changeCamera(){
    this.cameraPreview.switchCamera();
  }

  accessCamera(){
    this.ionViewDidEnter();
  }
}
