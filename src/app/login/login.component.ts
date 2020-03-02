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
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
  }

  async login() {
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
        this.authenticationService.resetIdleCounter();
        this.storageService.currentUser = response.user.firstName + ' ' + response.user.lastName;
        this.blockUI.stop();
        this.messageService.sendMessage('User Logged in');
        if (Boolean(this.returnUrl) === false || this.returnUrl === '') {
          this.returnUrl = '/';
        }
        this.router.navigate([this.returnUrl]);
      } else {
        this.blockUI.stop();
        this.messageService.sendMessage('User Not Logged in');
      }
    } catch (error) {
      this.blockUI.stop();
      this.loading = false;
    }
  }
}

