import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthRequest } from '../_models/authRequest';
import { AuthResponse } from '../_models/authResponse';
import * as AppGlobal from '../global';
import { BaseAPIService } from './baseAPI.service';
import { MessageService } from './message.service';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService extends BaseAPIService {
  @BlockUI() blockUI: NgBlockUI;
  timedOut = false;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private messageService: MessageService,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive) {
    super();
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

  async appllicationStartup() {
    this.setupIdleMonitor();
    if (this.storageService.token != null) {
      try {
        this.blockUI.start('Loading...');
        await this.getCurrentLogin().toPromise();
        this.resetIdleCounter();
        this.blockUI.stop();
      } catch (error) {
        this.blockUI.stop();
        this.logout();
        this.navigateToLogin(false);
      }
    }
  }

  resetIdleCounter() {
    this.idle.watch();
    this.timedOut = false;
  }

  getCurrentLogin(): Observable<void> {
    return this.httpClient.get<AuthResponse>(this.baseUrl + 'api/authenticate/current')
      .pipe(map((response: AuthResponse) => {
        // login successful if there's a jwt token in the response
        if (response && response.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.token = response.token;
          this.storageService.userType = response.type;
        }
        this.resetIdleCounter();
      }), catchError(error => {
        return throwError(error);
      }));
  }

  loginStore(req: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.baseUrl + 'api/authenticate/store', req);
  }

  loginUser(req: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.baseUrl + 'api/authenticate/user', req);
  }

  changePassword(model: any) {
    return this.httpClient.post<void>(this.baseUrl + 'api/authenticate/changePassword', model);
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
