import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OccurrencesPage } from './occurrences';

@NgModule({
  declarations: [
    OccurrencesPage,
  ],
  imports: [
    IonicPageModule.forChild(OccurrencesPage),
  ],
})
export class OccurrencesPageModule {}
