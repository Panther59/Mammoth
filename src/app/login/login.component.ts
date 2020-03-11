import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AuthRequest } from '../_models/authRequest';
import { AuthenticationService } from '../_services/authentication.service';
import { MessageService } from '../_services/message.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private titleService: Title) {
    this.titleService.setTitle('Login | Mammoth');
    this.model.type = this.storageService.loginUserType ?? 'Store';
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
  }
  async login() {
    this.storageService.loginUserType = this.model.type;
    if (this.model.type === 'User') {
      await this.loginUser();
    } else {
      await this.loginStore();
    }
  }
  async loginUser() {
    this.loading = true;
    this.blockUI.start('Validating...');
    try {
      const req = new AuthRequest();
      req.loginName = this.model.username;
      req.password = this.model.password;
      const response = await this.authenticationService.loginUser(req).toPromise();
      if (response && response.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.storageService.token = response.token;
      }
      this.authenticationService.resetIdleCounter();
      if (response.user) {
        this.storageService.currentUser = response.user.firstName + ' ' + response.user.lastName;
        this.storageService.userType = 'User';
        this.blockUI.stop();
        this.messageService.sendMessage('User Logged in');
        if (Boolean(this.returnUrl) === false || this.returnUrl === '') {
          this.returnUrl = '/dashboard';
        }
        this.router.navigate([this.returnUrl]);
      } else {
        this.blockUI.stop();
        this.messageService.sendMessage('User Not Logged in');
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.blockUI.stop();
      this.messageService.showError('Login', error);
    }
  }

  async loginStore() {
    this.loading = true;
    this.blockUI.start('Validating...');
    try {
      const req = new AuthRequest();
      req.loginName = this.model.username;
      req.password = this.model.password;
      const response = await this.authenticationService.loginStore(req).toPromise();
      if (response && response.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.storageService.token = response.token;
      }
      this.authenticationService.resetIdleCounter();
      if (response) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.storageService.currentUser = response.store.code;
        this.storageService.userType = 'Store';
        this.blockUI.stop();
        this.messageService.sendMessage('Store Logged in');
        if (Boolean(this.returnUrl) === false || this.returnUrl === '') {
          this.returnUrl = '/sale';
        }
        this.router.navigate([this.returnUrl]);
      } else {
        this.blockUI.stop();
        this.messageService.sendMessage('Store Not Logged in');
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.blockUI.stop();
      this.messageService.showError('Login', error);
    }
  }
}

