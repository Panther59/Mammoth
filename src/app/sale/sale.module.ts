import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { TokenInterceptor } from '../_interceptors/token.interceptor';
import { DefaultComponent } from './default/default.component';
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { StoreSaleComponent } from './store-sale/store-sale.component';

@NgModule({
  declarations: [DefaultComponent, StoreSaleComponent, ProductSaleComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }]
})
export class SaleModule { }
