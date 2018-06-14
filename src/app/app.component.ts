import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
//import { AppMinimize } from '@ionic-native/app-minimize';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private translateService: TranslateService,
              //private appMinimize: AppMinimize,
              public storage: Storage,
              ) {
    platform.ready().then(() => {

      //Language
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('user').then((val) => {
        //Si se ha iniciado la sesion
        if(val)
         this.rootPage = 'TabsPage';
        //Si no se ha iniciado sesion
        else
          this.rootPage='LoginPage'
      });  
    });
    /*
    platform.registerBackButtonAction(() => {
      this.appMinimize.minimize();
    });*/
  }
}

