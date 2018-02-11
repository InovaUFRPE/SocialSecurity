import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterContactPage } from './register-contact';

@NgModule({
  declarations: [
    RegisterContactPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterContactPage),
  ],
})
export class RegisterContactPageModule {}
