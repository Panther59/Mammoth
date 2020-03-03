import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

import { ProductSale } from '../_models/productSale';
import { StoreSale } from '../_models/storeSale';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

@Injectable()
export class SalesService {
  @BlockUI() blockUI: NgBlockUI;
  timedOut = false;
  baseUrl = 'https://localhost:5001/';
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private messageService: MessageService) {
  }

  getProductSales(): Observable<Array<ProductSale>> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    return this.httpClient.get<Array<ProductSale>>(this.baseUrl + 'api/sales/products', { headers });
  }

  getStoreSale(): Observable<StoreSale> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    return this.httpClient.get<StoreSale>(this.baseUrl + 'api/sales/store', { headers });
  }

  saveProductSale(products: ProductSale[]): Observable<void> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    return this.httpClient.post<void>(this.baseUrl + 'api/sales/products', products, { headers });
  }

  saveStoreSale(storeSale: StoreSale): Observable<void> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    return this.httpClient.post<void>(this.baseUrl + 'api/sales/store', storeSale, { headers });
  }

}
