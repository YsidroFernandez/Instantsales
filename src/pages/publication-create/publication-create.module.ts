import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { publicationCreatePage } from './publication-create';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    publicationCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(publicationCreatePage),
    TranslateModule,
  ],
  exports: [
    publicationCreatePage
  ]
})
export class publicationCreatePageModule {}
