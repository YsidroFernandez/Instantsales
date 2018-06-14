import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
    TranslateModule
  ],
  
})
export class SettingPageModule {}
