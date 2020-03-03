import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProductSale } from 'src/app/_models/productSale';
import { MessageService } from 'src/app/_services/message.service';
import { SalesService } from 'src/app/_services/sales.service';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  products: Array<ProductSale> = [];
  dataMissing: boolean = undefined;
  constructor(
    public salesService: SalesService,
    public messageService: MessageService) {
    this.initialize();
  }
  isDataMissing(): boolean {
    return this.dataMissing;
  }

  checkDataMissing(): boolean {
    if (this.products) {
      return this.products.some(x => x.saleCount === undefined || x.saleCount === null);
    }
  }

  async save() {
    try {
      this.blockUI.start('Saving Product Sales');
      await this.salesService.saveProductSale(this.products).toPromise();
      this.blockUI.stop();
      this.initialize();
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Product Sale', error);
    }
  }
  async initialize() {
    try {
      this.products = await this.salesService.getProductSales().toPromise();
    } catch (error) {
      this.messageService.showError('Product Sale', error);
    }
    this.dataMissing = this.checkDataMissing();
  }


  ngOnInit(): void {
  }

}
