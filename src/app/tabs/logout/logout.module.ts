import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { LogoutPageRoutingModule } from './logout-routing.module';
import { LogoutPage } from './logout';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LogoutPageRoutingModule
  ],
  declarations: [LogoutPage]
})
export class LogoutPageModule {}
