import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikesPage } from './likes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LikesPage,
  ],
  imports: [
    IonicPageModule.forChild(LikesPage),
    TranslateModule,
  ],
  exports: [
    LikesPage
  ]
})
export class LikesPageModule {}
