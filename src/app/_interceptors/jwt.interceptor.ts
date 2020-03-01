import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from "../_services/index";
import { ServiceError } from "../_models/index";
import * as AppGlobal from "../global";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (ex: any) => {
            const err: string = JSON.stringify(ex.error);
            AppGlobal.logErrorData(err);
            let errObj: ServiceError = JSON.parse(err);
            if (errObj && errObj.Message) {
                throw new Error(errObj.Message);
            }
            else {
                if (ex instanceof HttpErrorResponse) {
                    //if (ex.status === 401) {
                    //    // redirect to the login route
                    //    // or show a modal
                    //}
                    throw new Error(ex.statusText);
                }
                else {
                    throw ex;
                }
            }
        });
    }
}