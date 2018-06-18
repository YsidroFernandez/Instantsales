import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationDescPage } from './publication-desc';

@NgModule({
  declarations: [
    PublicationDescPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationDescPage),
  ],
})
export class PublicationDescPageModule {}
