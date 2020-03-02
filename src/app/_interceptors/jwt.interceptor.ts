import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { ServiceError } from '../_models/serviceError';
import { StorageService } from '../_services/storage.service';
import * as AppGlobal from '../global';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((ex: any) => {
      const err: string = JSON.stringify(ex.error);
      AppGlobal.logErrorData(err);
      const errObj: ServiceError = JSON.parse(err);
      if (errObj && errObj.Message) {
        throw new Error(errObj.Message);
      } else {
        if (ex instanceof HttpErrorResponse) {
          // if (ex.status === 401) {
          //    // redirect to the login route
          //    // or show a modal
          // }
          throw new Error(ex.statusText);
        } else {
          throw ex;
        }
      }
    }));
  }
}
