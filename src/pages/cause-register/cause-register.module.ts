import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CauseRegisterPage } from './cause-register';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CauseRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(CauseRegisterPage),
    TranslateModule,
  ],
  exports: [
    CauseRegisterPage
  ]
})
export class CauseRegisterPageModule {}


