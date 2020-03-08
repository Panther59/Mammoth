import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { StorageService } from '../_services/storage.service';

@Injectable()
export class StoreAuthGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.token != null && this.storageService.userType === 'Store') {
      // logged in so return true
      return true;
    }

    if (state.url === '/home') {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    } else {
      // not logged in so redirect to login page with the return url
      const returnUrl = state.url;
      if (returnUrl === '/' || returnUrl === '/login') {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl } });
      }
      return false;
    }
  }
}
