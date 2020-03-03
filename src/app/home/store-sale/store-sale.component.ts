import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StoreSale } from 'src/app/_models/storeSale';
import { MessageService } from 'src/app/_services/message.service';
import { SalesService } from 'src/app/_services/sales.service';

@Component({
  selector: 'app-store-sale',
  templateUrl: './store-sale.component.html',
  styleUrls: ['./store-sale.component.scss']
})
export class StoreSaleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  model = new StoreSale();
  isFormLoaded = false;
  dataMissing: boolean = undefined;
  constructor(
    public salesService: SalesService,
    public messageService: MessageService) {
    this.initialize();
  }

  async initialize() {
    try {
      const response = await this.salesService.getStoreSale().toPromise();
      this.isFormLoaded = true;
      if (response) {
        this.model = response;
        this.dataMissing = false;
      } else {
        this.model = new StoreSale();
        this.model.cashDeposite = true;
        this.dataMissing = true;
      }
    } catch (error) {
      this.messageService.showError('Store Sale', error);
    }
  }

  ngOnInit(): void {
  }

  async save() {
    try {
      this.blockUI.start('Saving Store Sale');
      await this.salesService.saveStoreSale(this.model).toPromise();
      this.blockUI.stop();
      this.initialize();
    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Product Sale', error);
    }
  }
  isDataMissing(): boolean {
    return this.dataMissing;
  }
}
