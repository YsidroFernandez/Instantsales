import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplorePage } from './explore';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ExplorePage,
  ],
  imports: [
    IonicPageModule.forChild(ExplorePage),
    TranslateModule,
  ],
  exports: [
    ExplorePage
  ],
})
export class ExplorePageModule {}
