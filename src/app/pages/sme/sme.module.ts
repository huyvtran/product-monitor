import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SMEPageRoutingModule } from './sme-routing.module';
import { SMEPage } from './sme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SMEPageRoutingModule
  ],
  declarations: [
    SMEPage,
  ]
})
export class SMEPageModule {}

export interface Lengend {
  color: string;
  ItemChart: string;
  ItemChartValue: number;
}

export interface MyResponse {
  Data: [];
  Success: boolean;
  Message: string;
}
