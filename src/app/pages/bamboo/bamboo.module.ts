import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BambooPageRoutingModule } from './bamboo-routing.module';

import { BambooPage } from './bamboo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BambooPageRoutingModule
  ],
  declarations: [BambooPage]
})
export class BambooPageModule {}
