import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { Crop } from '@ionic-native/crop';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserProvider } from '../providers/user/user';
import { CauseProvider } from '../providers/cause/cause';
import { SettingPage } from '../pages/setting/setting';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    SettingPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppMinimize,
    Camera,
    Geolocation,
    CameraPreview,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    CauseProvider,
    SocialSharing,
    Facebook
  ],
  exports: [
    SettingPage
  ]
})
export class AppModule {
  
}
