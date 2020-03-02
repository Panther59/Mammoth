import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { SalesService } from 'src/app/_services/sales.service';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent implements OnInit {
  products: Array<Product> = [];
  constructor(public salesService: SalesService) {
    this.initialize();
  }

  save(){}
  async initialize() {
    this.products = await this.salesService.getProducts().toPromise();
  }


  ngOnInit(): void {
  }

}
