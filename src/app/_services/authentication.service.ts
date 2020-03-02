import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthRequest } from '../_models/authRequest';
import { AuthStoreResponse } from '../_models/authStoreResponse';
import { AuthUserResponse } from '../_models/authUserResponse';
import { Store } from '../_models/store';
import { User } from '../_models/user';
import * as AppGlobal from '../global';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {

  @BlockUI() blockUI: NgBlockUI;
  timedOut = false;
  baseUrl = 'https://localhost:5001/';
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive) {
  }

  setupIdleMonitor() {

    // sets an idle timeout of 180 seconds, for testing purposes.
    this.idle.setIdle(600);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      this.logout();
      this.messageService.showMessage('Mammoth', 'Your session has expired... please log in...').then((data) => {
        this.navigateToLogin(true);
      }).catch((er) => {
        AppGlobal.logErrorData(er);
        this.navigateToLogin(true);
      });
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);
  }

  navigateToLogin(passReturnUrl: boolean) {
    if (passReturnUrl) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    } else {
      this.router.navigate(['/login']);
    }
  }

  appllicationStartup() {
    this.setupIdleMonitor();
    // if (this.storageService.token != null) {
    //   this.blockUI.start('Loading...');
    //   this.getCurrentLogin().subscribe((data) => {
    //     this.storageService.currentUser = data;
    //     this.resetIdleCounter();
    //     this.blockUI.stop();
    //   },
    //     (error) => {
    //       this.logout();
    //       this.navigateToLogin(false);
    //       this.blockUI.stop();
    //     });
    // }
  }

  resetIdleCounter() {
    this.idle.watch();
    this.timedOut = false;
  }

  // loginUser(req: AuthRequest): Observable<AuthUserResponse> {
  //   return this.httpClient.post<AuthUserResponse>(this.baseUrl + 'api/authenticate/user', req);
  // }

  loginStore(req: AuthRequest): Observable<Store> {
    return from(this.httpClient.post<AuthStoreResponse>(this.baseUrl + 'api/authenticate/store', req))
      .pipe(map((response: AuthStoreResponse) => {
        // login successful if there's a jwt token in the response
        if (response && response.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.token = response.token;
        }
        this.resetIdleCounter();
        return response.store;
      }));
  }

  loginUser(req: AuthRequest): Observable<User> {
    return from(this.httpClient.post<AuthUserResponse>(this.baseUrl + 'api/authenticate/user', req))
      .pipe(map((response: AuthUserResponse) => {
        // login successful if there's a jwt token in the response
        if (response && response.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.token = response.token;
        }
        this.resetIdleCounter();
        return response.user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.storageService.currentUser = null;
    this.storageService.token = null;
    this.timedOut = true;
    this.idle.stop();
    this.router.navigate(['/login']);
  }
}
