import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MshopkeeperPage } from './mshopkeeper.page';

const routes: Routes = [
  {
    path: '',
    component: MshopkeeperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MshopkeeperPageRoutingModule {}
