import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QltsPageRoutingModule } from './qlts-routing.module';

import { QltsPage } from './qlts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QltsPageRoutingModule
  ],
  declarations: [QltsPage]
})
export class QltsPageModule {}
