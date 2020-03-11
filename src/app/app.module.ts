import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BlockUIModule } from 'ng-block-ui';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { IndianDateAdapter } from './_adapter/indianDateAdapter';
import { StoreAuthGuard } from './_guards/storeAuth.guard';
import { UserAuthGuard } from './_guards/userAuth.guard';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { AuthenticationService } from './_services/authentication.service';
import { FilesService } from './_services/files.services';
import { MessageService } from './_services/message.service';
import { ReportsService } from './_services/reports.service';
import { SalesService } from './_services/sales.service';
import { StorageService } from './_services/storage.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgIdleKeepaliveModule.forRoot(),
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
  ],
  providers: [
    AuthenticationService,
    StorageService,
    SalesService,
    MessageService,
    FilesService,
    StoreAuthGuard,
    UserAuthGuard,
    ReportsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
    { provide: NativeDateAdapter, useClass: IndianDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
