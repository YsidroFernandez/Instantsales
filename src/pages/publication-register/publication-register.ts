import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { publicationProvider } from '../../providers/publication/publication';
import { UserProvider } from '../../providers/user/user';
//import {TranslateService} from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-publication-register',
  templateUrl: 'publication-register.html'
})
export class publicationRegisterPage {
	public publication: any = [];
	disabled: boolean = false;
	private submitAttempt: boolean = false;
	photo: string; 
  publicationForm: FormGroup;
  public loader: any;

  constructor(public navCtrl: NavController,
  			 public navParams: NavParams,
  			 public formBuilder: FormBuilder,
  			 private storage: Storage,
  			 public publicationProvider: publicationProvider,
  			 public userProvider: UserProvider,
         private loadingCtrl: LoadingController){
    this.loader = this.loadingCtrl.create({
                content: 'Please wait...'
              });
  	this.photo = this.navParams.get('photo');
    let isView = this.isViewPublication();

  	this.publicationForm = formBuilder.group({
	      name: [{value:'', disabled : isView}, Validators.compose([Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9_. ]*'), Validators.required])],
	      description: [{value:'', disabled : isView}, Validators.compose([Validators.maxLength(200), Validators.pattern('[a-zA-Z0-9_. ]*'), Validators.required])],
	      location: [{value:'', disabled : isView}],
	      contact: [{value:'', disabled : isView}],
        creationDate: [{value:'', disabled : isView}],
        username: [{value:'', disabled : isView}],
	  });
    console.log(this.publicationForm.get('creationDate'));
    
    if(this.navParams.get('publication')){
        this.publication = this.navParams.get('publication');
        this.photo = this.publication.photo;
        this.publicationForm.get('name').setValue(this.publication.name);
        this.publicationForm.get('description').setValue(this.publication.description);
        this.publicationForm.get('location').setValue(this.publication.location);
        this.publicationForm.get('contact').setValue(this.publication.contact);
        this.publicationForm.get('creationDate').setValue(this.publication.creationDate);
        this.publicationForm.get('username').setValue(this.publication.userId.username);
      }
      console.log(this.publicationForm.get('creationDate'));
  }

  isViewPublication(){
    return !this.navParams.get('photo');
  }

  savepublication(){
  	this.submitAttempt=true;
    this.storage.get('user').then((val) => {
      if(val){
        let par = JSON.parse(val);
        console.log(this.publicationForm.valid);
        console.log(this.publicationForm.value);
        if(this.publicationForm.valid){
          this.loader.present();

	        let publication = {...this.publicationForm.value,
          			       "userId": par._id,
                       "photo": this.photo};
          delete publication.creationDate;
	        this.publicationProvider.addpublication(publication)
	        .then((result) => {
	          this.userProvider.getUser(par._id,par._id).then((res)=>{
	            console.log(res['items']);
	            this.storage.set('user', JSON.stringify(res['items']));
              this.loader.dismiss();
              this.navCtrl.parent.select(0);
	          },(err)=>alert("getUser"+err));
	        }, (err)=>alert("addpublication"+err));
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
    this.navCtrl.push('ProfilePage',{userId: this.publication.userId},
    {animate: true, direction: 'forward'});
  }

 }




