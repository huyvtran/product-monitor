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
  {
    path: 'qlcb',
    loadChildren: () => import('./pages/qlcb/qlcb.module').then( m => m.QlcbPageModule)
  },
  {
    path: 'qlts',
    loadChildren: () => import('./pages/qlts/qlts.module').then( m => m.QltsPageModule)
  },
  {
    path: 'mshopkeeper',
    loadChildren: () => import('./pages/mshopkeeper/mshopkeeper.module').then( m => m.MshopkeeperPageModule)
  },
  {
    path: 'bamboo',
    loadChildren: () => import('./pages/bamboo/bamboo.module').then( m => m.BambooPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
