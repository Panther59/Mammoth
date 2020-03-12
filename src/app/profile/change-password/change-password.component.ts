import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Store } from 'src/app/_models/store';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessageService } from 'src/app/_services/message.service';
import { ReportsService } from 'src/app/_services/reports.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  loading = false;
  isStorePasswordChanged = false;
  model: any = {};
  stores: Store[];
  userMode = false;
  constructor(
    private reportsService: ReportsService,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.initialize();
  }

  async initialize() {
    try {
      if (this.storageService.userType === 'User') {
        this.userMode = true;
        const date = new Date(Date.now());
        const response = await this.reportsService.getReportsSummary(date).toPromise();
        this.stores = response.map(x => x.store);
      }
    } catch (error) {

    }
  }
  ngOnInit(): void {
  }

  async changePassword() {
    try {
      this.blockUI.start('Changing Password...');
      if (this.isStorePasswordChanged) {
        await this.authenticationService.changePassword(this.model).toPromise();
        this.blockUI.stop();
        await this.messageService.showMessage('Password Change', 'Password change was successful.');
        this.model = {};
      } else {
        this.model.storeId = undefined;
        await this.authenticationService.changePassword(this.model).toPromise();
        this.blockUI.stop();
        await this.messageService.showMessage('Password Change', 'Password change was successful, please login using new password');
        this.router.navigate(['/login']);
      }

    } catch (error) {
      this.blockUI.stop();
      this.messageService.showError('Chanage Password', error);
    }

  }
}
