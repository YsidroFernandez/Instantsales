import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { publicationRegisterPage } from './publication-register';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    publicationRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(publicationRegisterPage),
    TranslateModule,
  ],
  exports: [
    publicationRegisterPage
  ]
})
export class publicationRegisterPageModule {}


