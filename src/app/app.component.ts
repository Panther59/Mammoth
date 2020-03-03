import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { routerTransition } from './_animations/router.transition.animation';
import { AuthenticationService } from './_services/authentication.service';
import { StorageService } from './_services/storage.service';
import { ThemeDialogComponent } from './shared/theme-dialog/theme-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'Mammoth';
  @HostBinding('class') componentCssClass;
  constructor(
    public overlayContainer: OverlayContainer,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    public dialog: MatDialog) {
    this.selectTheme(this.storageService.theme);
  }
  selectTheme(theme: string = null) {
    let selectedTheme = 'dark-indigo-theme';
    if (theme != null) {
      selectedTheme = theme;
    }

    this.applyTheme(selectedTheme);
    this.storageService.theme = selectedTheme;
  }

  applyTheme(theme: string) {
    this.componentCssClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove && toRemove.length > 0) {
      classList.remove(...toRemove);
    }

    classList.add(theme);
  }

  async viewTheme() {
    const dialogRef = this.dialog.open(ThemeDialogComponent);

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.selectTheme(result);
    }
  }
  logout() {
    this.authenticationService.logout();
  }

  isLoggedIn() {
    return this.storageService.token && this.storageService.currentUser;
  }

  getUserName() {
    if (this.storageService.token &&
      this.storageService.currentUser) {
      return this.storageService.currentUser;
    } else {
      return 'Guest';
    }
  }

  isStoreUser() {
    return this.storageService.token &&
      this.storageService.currentUser &&
      this.storageService.userType === 'Store';
  }

  isSupUser() {
    return this.storageService.token &&
      this.storageService.currentUser &&
      this.storageService.userType === 'User';
  }
}
