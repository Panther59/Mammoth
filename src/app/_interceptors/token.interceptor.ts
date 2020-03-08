import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../_services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private router: Router) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl('/login');
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('token added');
    if (this.storageService.token) {
      let headers = request.headers;
      headers = headers.append('Authorization', `Bearer ${this.storageService.token}`);
      request = request.clone({ headers });
    }

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
}
