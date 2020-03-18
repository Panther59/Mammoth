import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @BlockUI() blockUI: NgBlockUI;
  data: Array<StoreSaleReport> = [];
  dataSource: MatTableDataSource<StoreSaleReport>;
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
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.blockUI.stop();
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Report', error);
    }
  }

  async deleteOldData(){
    try {
      this.blockUI.start('Deleting old data');
      const response = await this.reportsService.deleteOldData().toPromise();
      this.blockUI.stop();
      this.messageService.showMessage('Clean Up', 'Old data deleted');
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Clean Up', error);
    }
  }

  async downloadReport() {
    try {
      this.blockUI.start('Loading report');
      const fileName = 'SalesReport_' +
      this.businessDate.getFullYear() +
      (this.businessDate.getMonth() + 1).toString(2) +
      this.businessDate.getDate().toString(2) + '.xlsx';
      const response = await this.reportsService.downloadReport(this.businessDate).toPromise();
      FileSaver.saveAs(
        response, fileName);
      this.blockUI.stop();
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Report', error);
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
  }

}
