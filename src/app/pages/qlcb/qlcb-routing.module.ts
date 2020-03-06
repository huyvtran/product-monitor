import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QlcbPage } from './qlcb.page';

const routes: Routes = [
  {
    path: '',
    component: QlcbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QlcbPageRoutingModule {}
