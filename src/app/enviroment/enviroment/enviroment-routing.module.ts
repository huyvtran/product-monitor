import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviromentPage } from './enviroment.page';

const routes: Routes = [
  {
    path: '',
    component: EnviromentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviromentPageRoutingModule {}
