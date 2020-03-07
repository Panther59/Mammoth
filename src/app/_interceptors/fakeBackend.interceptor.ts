import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { AuthResponse } from '../_models/authResponse';
import { User } from '../_models/user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  next: HttpHandler;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    this.next = next;
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(this.handleRoute(request)))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  handleRoute(request): any {
    if (request.url.includes('localhost') && request.url.endsWith('/authenticate/user') && request.method === 'POST') {
      return this.authenticate();
    } else {
      return this.next.handle(request);
    }
  }

  // route functions

  authenticate() {
    const response = new AuthResponse();
    response.user = new User();
    response.user.firstName = 'Utkarsh';
    response.user.lastName = 'Chauhan';
    response.user.type = 1;
    response.token = 'sadasdasdasda';
    return this.ok(response);
  }

  // helper functions

  ok(body?) {
    return of(new HttpResponse({ status: 200, body }));
  }

}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
