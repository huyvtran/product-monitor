import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MshopkeeperPageRoutingModule } from './mshopkeeper-routing.module';

import { MshopkeeperPage } from './mshopkeeper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MshopkeeperPageRoutingModule
  ],
  declarations: [MshopkeeperPage]
})
export class MshopkeeperPageModule {}
