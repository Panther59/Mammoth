import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

import { ProductSale } from '../_models/productSale';
import { StoreSale } from '../_models/storeSale';
import { BaseAPIService } from './baseAPI.service';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

@Injectable()
export class SalesService extends BaseAPIService {
  @BlockUI() blockUI: NgBlockUI;
  timedOut = false;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private messageService: MessageService) {
    super();
  }

  getProductSales(): Observable<Array<ProductSale>> {
    return this.httpClient.get<Array<ProductSale>>(this.baseUrl + 'api/sales/products');
  }

  getStoreSale(): Observable<StoreSale> {
    return this.httpClient.get<StoreSale>(this.baseUrl + 'api/sales/store');
  }

  saveProductSale(products: ProductSale[]): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + 'api/sales/products', products);
  }

  saveStoreSale(storeSale: StoreSale): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + 'api/sales/store', storeSale);
  }

}
