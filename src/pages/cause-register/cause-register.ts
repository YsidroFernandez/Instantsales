import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CauseProvider } from '../../providers/cause/cause';
import { UserProvider } from '../../providers/user/user';
//import {TranslateService} from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-cause-register',
  templateUrl: 'cause-register.html'
})
export class CauseRegisterPage {
	public cause: any = [];
	disabled: boolean = false;
	private submitAttempt: boolean = false;
	photo: string; 
  causeForm: FormGroup;
  public loader: any;

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
  			 public formBuilder: FormBuilder,
  			 private storage: Storage,
  			 public causeProvider: CauseProvider,
  			 public userProvider: UserProvider,
         private loadingCtrl: LoadingController){
    this.loader = this.loadingCtrl.create({
                content: 'Please wait...'
              });
  	this.photo = this.navParams.get('photo');
  	this.causeForm = formBuilder.group({
	      name: ['', Validators.compose([Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9_. ]*'), Validators.required])],
	      description: ['', Validators.compose([Validators.maxLength(200), Validators.pattern('[a-zA-Z0-9_. ]*'), Validators.required])],
	      location: [''],
	      contact: [''],
        creationDate: [''],
        username: [''],
	  });
    
    if(this.navParams.get('cause')){
        this.cause = this.navParams.get('cause');
        this.disabled = true;
        this.photo = this.cause.photo;
        this.causeForm.get('name').setValue(this.cause.name);
        this.causeForm.get('description').setValue(this.cause.description);
        this.causeForm.get('location').setValue(this.cause.location);
        this.causeForm.get('contact').setValue(this.cause.contact);
        this.causeForm.get('creationDate').setValue(this.cause.creationDate);
        this.causeForm.get('username').setValue(this.cause.username);
      }
  }

  saveCause(){
  	this.submitAttempt=true;
    this.storage.get('user').then((val) => {
      if(val){
        let par = JSON.parse(val);
        console.log(this.causeForm.valid);
        console.log(this.causeForm.value);
        if(this.causeForm.valid){
          this.loader.present();

	        let cause = {...this.causeForm.value,
          			       "userId": par.idString,
                       "username": par.username,
                       "useremail": par.email,
                       "photo": this.photo};
	        this.causeProvider.addCause(cause)
	        .then((result) => {
	          alert(result);
	          this.userProvider.getUser(par.idString,par.idString).then((res)=>{
	            console.log(res['items']);
	            this.storage.set('user', JSON.stringify(res['items']));
              this.loader.dismiss();
              this.navCtrl.parent.select(0);
	          },(err)=>alert("getUser"+err));
	        }, (err)=>alert("addCause"+err));
    		}
  		}
  	}, (err)=>alert("storage"+err));
	}

  goBack(){
  	this.navCtrl.pop();
  }
  
  cancelar(){
    this.navCtrl.parent.select(0);
  }

  goProfileUser(){
    this.navCtrl.push('ProfilePage',{userId: this.cause.userId},
    {animate: true, direction: 'forward'});
  }

 }




