import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreSaleReport } from '../_models/storeSaleReport';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

@Injectable()
export class ReportsService {
  baseUrl = 'https://localhost:5001/';
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private messageService: MessageService) {
  }

  getReportsSummary(date: Date): Observable<Array<StoreSaleReport>> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    return this.httpClient.get<Array<StoreSaleReport>>(this.baseUrl + 'api/reports/summary/' + this.getDateFormat(date), { headers });
  }

  downloadReport(date: Date): Observable<Blob> {
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.storageService.token}`);
    headers = headers.append('responseType', 'blob');
    return this.httpClient.get(
      this.baseUrl + 'api/reports/report/' + this.getDateFormat(date),
      {
        headers,
        responseType: 'blob'
      });
  }

  getDateFormat(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate();
  }
}
