import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BambooPage } from './bamboo.page';

const routes: Routes = [
  {
    path: '',
    component: BambooPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BambooPageRoutingModule {}
