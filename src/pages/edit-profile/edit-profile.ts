import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TranslateService} from '@ngx-translate/core';
import { Crop } from '@ionic-native/crop';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  @ViewChild('passwordInput') passwordInput;
  private isShowedPassword: boolean = false;
  private colorEye: string = 'white';
  private submitAttempt: boolean = false;
  selectOptions:any;
  public user: any = [];
  userId : string;

  loginForm: FormGroup;
  public loader: any;

  readonly options: CameraOptions = {
    quality: 70,
    targetWidth: 640,
    targetHeight: 640,
    correctOrientation: true,
    saveToPhotoAlbum: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              private storage: Storage,
              public crop: Crop,
              private camera: Camera,
              private translate: TranslateService,
              public events : Events
            ) {

              this.userId = this.navParams.get('userId');
              let isView = this.isViewProfile();
              this.selectOptions = {
                interface: "popover",
              };
              
              this.loginForm = formBuilder.group({
                  username: [{value: "", disabled: true}],
                  email: [{value: "", disabled: true}],
                  isPublic: [{value: "", disabled: isView}],
                  name: [{value: "", disabled: isView}, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                  birthdate: [{value: "", disabled: isView},Validators.compose([ Validators.required])],
                  gender: [{value: "", disabled: isView}, Validators.compose([ Validators.required])],
                  ocupation: [{value: "", disabled: isView}],
                  bio: [{value: "", disabled: isView}, Validators.maxLength(30)],
                  facebook: [{value: "", disabled: isView}, Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9_.]*')])],
                  instagram: [{value: "", disabled: isView}, Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9_.]*')])],
                  
              });
            }

  isViewProfile(){
    return !!this.navParams.get('userId');
  }

  ionViewDidLoad() {
    this.storage.get('user').then((val) => {
      if(val){
        var par = JSON.parse(val);
        if(!this.userId)
          this.userId = par.idString;
        console.log(this.userId);
        this.userProvider.getUser(this.userId, this.userId)
        .then((result) => {
          this.user=result['items'];
          this.loginForm.get('username').setValue(this.user.username);
          this.loginForm.get('email').setValue(this.user.email);
          this.loginForm.get('name').setValue(this.user.name);
          this.loginForm.get('isPublic').setValue(this.user.isPublic);
          this.loginForm.get('gender').setValue(this.user.gender);
          this.loginForm.get('bio').setValue(this.user.bio);
          this.loginForm.get('birthdate').setValue(this.user.birthdate);
          this.loginForm.get('ocupation').setValue(this.user.ocupation);
          this.loginForm.get('facebook').setValue(this.user.facebook);
          this.loginForm.get('instagram').setValue(this.user.instagram);
        }, (err)=>console.log(err)); //userProvider.getUser
      }
    }, (err)=>console.log(err)); // storage.get 
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.events.publish("updateProfile");
  }

  updatePicture(){
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let option = {

      quality:100,
      targetHeight: 640,
      targetWidth: 640,
    };
    this.camera.getPicture(this.options).then((imageData) => {
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
          this.user.profilePicture=cropped_img_base64;
          this.userProvider.updateUserPicture(this.user).then((result) => {
          this.okAlert();
          this.loader.dismiss();
          this.userProvider.getUser(this.user.idString,this.user.idString).then((res)=>{
            console.log(res['items']);
            this.storage.set('user', JSON.stringify(res['items']));  
          },(err)=>console.log(err)); //getUser
        }, (err) => { //udateUserPicture
          console.log(err);
          this.errorAlert(err);
          this.loader.dismiss();
        });

        }
      }, error => alert(error)); //crop

     }, (err) => alert(err)); //getpicture
      
     /*
     this.user.profilePicture=base64Image;
      this.userProvider.updateUserPicture(this.user).then((result) => {
        this.okAlert();
        this.loader.dismiss();
      }, (err) => {
        console.log(err);
        this.errorAlert(err);
        this.loader.dismiss();
      });*/
  }

  update(){
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    console.log(this.user);
    
    console.log(this.loginForm.valid);
    console.log(this.loginForm);
    if(this.loginForm.valid){
      this.submitAttempt = false;
      console.log(this.loginForm.value);
      this.loader.present();
      var userUpdated = this.loginForm.value;
      userUpdated['idString'] = this.user.idString;
      this.userProvider.editUser(userUpdated).then((result) => {
        console.log(result);
        this.userProvider.getUser(this.user.idString,this.user.idString).then((res)=>{
          console.log(res['items']);
          console.log(userUpdated);
          this.storage.set('user', JSON.stringify(res['items']));
          this.okAlert();
          this.loader.dismiss();
        },(err)=>console.log(err));
      }, (err) => {
        console.log(err);
        this.errorAlert(err);
        this.loader.dismiss();
      });
    }
    else
      this.submitAttempt = true;
  }
  okAlert() {
    var updatedSuccess = "";
    
    this.translate.get('MSG_UPD_SUCCESS').subscribe((res: string) => {
      updatedSuccess = res;
      let alert = this.alertCtrl.create({
        title: updatedSuccess,
        buttons: ['Ok']
      });
      alert.present();
      
    });
    
    
  }
  errorAlert(err) {
    this.translate.get('MSG_TRY_AGAIN').subscribe((res: string) => {

      let alert = this.alertCtrl.create({
        title: res,
        subTitle: err,
        buttons: [res]
      });
      alert.present();
    });
    
  }

  showHide(){
    this.isShowedPassword = !this.isShowedPassword;
    if(this.isShowedPassword){
      this.passwordInput.type = "text";
      this.colorEye = "light";    
    } 
    else{
      this.passwordInput.type = "password";
      this.colorEye = "white";
    }
    this.passwordInput.setFocus();
    var value  = this.passwordInput.value;
    this.passwordInput.value = value;
    console.log(value);
  }


}
