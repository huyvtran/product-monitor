import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QlcbPageRoutingModule } from './qlcb-routing.module';

import { QlcbPage } from './qlcb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QlcbPageRoutingModule
  ],
  declarations: [QlcbPage]
})
export class QlcbPageModule {}
