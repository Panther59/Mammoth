import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../_services/index";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (this.storageService.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${this.storageService.token}`
              }
          });
      }

    return next.handle(request);
  }
}