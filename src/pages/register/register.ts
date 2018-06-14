import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('passwordInput') passwordInput;
  @ViewChild('passwordInput2') passwordInput2;
  private isShowedPassword: boolean = false;
  private colorEye: string = 'white';
  private submitAttempt: boolean = false;
  private geolocate: any;
  selectOptions:any;
  user = {
    username: '',
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: '',
    ocupation:'',
    location:'',
    facebook:'',
    instagram:'',
    password:'',
    countCauses: 0,
    countFollowers:0,
    countFollowing:0,
    profilePicture: ''
  };

  loginForm: FormGroup;
  public loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              private geolocation: Geolocation,
              ) {
                this.selectOptions = {
                  interface: "popover",
                };
                this.loader = this.loadingCtrl.create({
                  content: 'Please wait...'
                });
                this.loginForm = formBuilder.group({
                  username: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9_.]*'), Validators.required]), this.validateUsernameNotTaken.bind(this)],
                  password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_.*$#-%/]*'), Validators.required])],
                  email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required]),this.validateEmailNotTaken.bind(this)],
                  name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                  passwordconfirm: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9_.*$#-%/]*'), Validators.required])],
                  
              },{validator: this.matchingPasswords('password', 'passwordconfirm')});
                //{validator: this.matchingPasswords('password', 'passwordconfirm')}
              this.geolocate = [];
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.geolocate = {"lat": resp.coords.latitude, "lng": resp.coords.longitude};
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  goToLogin(){
  	this.navCtrl.setRoot('LoginPage');
  }

  doRegister(){
    //this.navCtrl.setRoot('TabsPage');
    /*console.log(this.user);
    this.loader.present();
    this.userProvider.addUser(this.user).then((result) => {
      this.okAlert();
      this.loader.dismiss();
    }, (err) => {
      console.log(err);
      this.errorAlert();
      this.loader.dismiss();
    });*/

    this.submitAttempt = true;



    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.loader.present();
      var data = this.loginForm.value;
      data['geolocate']= this.geolocate;
      this.userProvider.addUser(data).then((result) => {
        this.okAlert();
        this.loader.dismiss();
        this.submitAttempt = false;

      }, (err) => {
        console.log(err);
        this.errorAlert();
        this.loader.dismiss();
        this.submitAttempt = false;
        
      });
    }
    
    //console.log(this.loginForm.value);
  }
  
  okAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registered Successfully',
      subTitle: 'Login with your credentials',
      buttons: ['Ok']
    });
    alert.present();
    this.goToLogin();
  }
  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Incorrect Data',
      buttons: ['Try Again']
    });
    alert.present();
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

  showHide2(){
    this.isShowedPassword = !this.isShowedPassword;
    if(this.isShowedPassword){
      this.passwordInput2.type = "text";
      this.colorEye = "light";    
    } 
    else{
      this.passwordInput2.type = "password";
      this.colorEye = "white";
    }
    this.passwordInput2.setFocus();
    var value  = this.passwordInput2.value;
    this.passwordInput2.value = value;
    console.log(value);
  }

  validateUsernameNotTaken(control: FormControl) {
  


    console.log(control.value);
    return this.userProvider.getUserByUsername(control.value).then((result) => {
      return result ? { usernameTaken: true } : null;
    }, (err) => {
      console.log(err);
    });

  }
  validateEmailNotTaken(control: FormControl) {
    console.log(control.value);
    this.submitAttempt = false;
    return this.userProvider.getUserByEmail(control.value).then((result) => {
      return result ? { emailTaken: true } : null;
    }, (err) => {
      console.log(err);
    });
  }
   matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
       this.submitAttempt=false;
      if (password.value !== confirmPassword.value) {
        console.log("distita");
        return {
          mismatchedPasswords: true

        };
      }
    }}
  
  
  
}
