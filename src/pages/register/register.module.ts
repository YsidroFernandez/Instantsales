import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    TranslateModule
  ],
  exports: [
    RegisterPage
  ]

})
export class RegisterPageModule {}
