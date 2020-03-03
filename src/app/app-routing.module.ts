import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sme', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'sme',
    loadChildren: () => import('./pages/sme/sme.module').then( m => m.SMEPageModule)
  },
  {
    path: 'meinvoice',
    loadChildren: () => import('./pages/meinvoice/meinvoice.module').then( m => m.MEINVOICEPageModule)
  },
  {
    path: 'enviroment',
    loadChildren: () => import('./enviroment/enviroment/enviroment.module').then( m => m.EnviromentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
