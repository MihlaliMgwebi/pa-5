import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListingsPage } from './listings.page';

import { ListingsPageRoutingModule } from './listings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListingsPageRoutingModule
  ],
  declarations: [ListingsPage]
})
export class ListingsPageModule {}
