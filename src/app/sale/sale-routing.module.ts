import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';

const saleRoutes: Routes = [
  { path: '', component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(saleRoutes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
