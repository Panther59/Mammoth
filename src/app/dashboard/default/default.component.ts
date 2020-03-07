import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StoreSaleReport } from 'src/app/_models/storeSaleReport';
import { MessageService } from 'src/app/_services/message.service';
import { ReportsService } from 'src/app/_services/reports.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  businessDate: Date;
  @BlockUI() blockUI: NgBlockUI;
  data: Array<StoreSaleReport> = [];
  constructor(
    public messageService: MessageService,
    public reportsService: ReportsService) {

    this.businessDate = new Date(Date.now());
    this.initialize();
  }

  businessDateChanged() {
    this.initialize();
  }

  async initialize() {
    try {
      this.blockUI.start('Loading report');
      this.data = await this.reportsService.getReportsSummary(this.businessDate).toPromise();
      this.blockUI.stop();
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Report', error);
    }
  }

  async downloadReport() {
    try {
      this.blockUI.start('Loading report');
      const response = await this.reportsService.downloadReport(this.businessDate).toPromise();
      FileSaver.saveAs(
        response,
        'SalesReport_' +
        this.businessDate.getFullYear() +
        (this.businessDate.getMonth() + 1).toString(2) +
        this.businessDate.getDate().toString(2));
      this.blockUI.stop();
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Report', error);
    }
  }

  ngOnInit() {
  }

}
