import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultComponent } from './default/default.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
