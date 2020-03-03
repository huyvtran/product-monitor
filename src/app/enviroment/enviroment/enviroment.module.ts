import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviromentPageRoutingModule } from './enviroment-routing.module';

import { EnviromentPage } from './enviroment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviromentPageRoutingModule
  ],
  declarations: [EnviromentPage]
})
export class EnviromentPageModule {}
