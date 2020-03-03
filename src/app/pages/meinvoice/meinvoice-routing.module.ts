import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MEINVOICEPage } from './meinvoice.page';

const routes: Routes = [
  {
    path: '',
    component: MEINVOICEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MEINVOICEPageRoutingModule {}
