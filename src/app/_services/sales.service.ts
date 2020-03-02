import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

import { Product } from '../_models/product';
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

  getProducts(): Observable<Array<Product>> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    return this.httpClient.get<Array<Product>>(this.baseUrl + 'api/products', { headers });
  }

}
