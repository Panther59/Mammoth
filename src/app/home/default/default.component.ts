import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductSaleComponent } from '../product-sale/product-sale.component';
import { StoreSaleComponent } from '../store-sale/store-sale.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  @ViewChild(ProductSaleComponent) productSale: ProductSaleComponent;
  @ViewChild(StoreSaleComponent) storeSale: StoreSaleComponent;
  constructor() { }

  ngOnInit() {
  }

  isProductDataMissing(): boolean {
    if (this.productSale) {
      return this.productSale.isDataMissing();
    }
  }

  isStoreDataMissing(): boolean {
    if (this.storeSale) {
      return this.storeSale.isDataMissing();
    }
  }
}
