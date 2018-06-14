import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CauseCreatePage } from './cause-create';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CauseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CauseCreatePage),
    TranslateModule,
  ],
  exports: [
    CauseCreatePage
  ]
})
export class CauseCreatePageModule {}
