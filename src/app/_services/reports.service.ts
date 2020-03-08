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
    return this.httpClient.get<Array<StoreSaleReport>>(this.baseUrl + 'api/reports/summary/' + this.getDateFormat(date));
  }

  deleteOldData(): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + 'api/reports/cleanup', null);
  }

  downloadReport(date: Date): Observable<Blob> {
    const headers = new HttpHeaders().append('responseType', 'blob');
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
