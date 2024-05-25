import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';

import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SearchPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
