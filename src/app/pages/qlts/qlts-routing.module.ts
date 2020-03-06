import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QltsPage } from './qlts.page';

const routes: Routes = [
  {
    path: '',
    component: QltsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QltsPageRoutingModule {}
