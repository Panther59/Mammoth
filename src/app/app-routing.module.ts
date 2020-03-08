import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreAuthGuard } from './_guards/storeAuth.guard';
import { UserAuthGuard } from './_guards/userAuth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule), canActivate: [StoreAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'sale',
    loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule), canActivate: [StoreAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [UserAuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
