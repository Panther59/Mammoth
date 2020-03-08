import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  constructor(
    public dialog: MatDialog) { }
  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  async showError(title: string, error: any, buttonText: string = null): Promise<void> {

    let message = error.message;
    if (error instanceof HttpErrorResponse) {
      if (error.error && error.error.error) {
        message = error.error.error;
      } else if (error.error && error.error.message) {
        message = error.error.message;
      }
    }

    await this.showMessage(title, message, buttonText);
  }

  async showMessage(title: string, message: string, buttonText: string = null): Promise<void> {
    const msgRef = this.dialog.open(MessageDialogComponent, {
      data: {},
      disableClose: true,
      hasBackdrop: true
    });
    msgRef.componentInstance.title = title;
    msgRef.componentInstance.message = message;
    if (buttonText != null) {
      msgRef.componentInstance.buttonText = buttonText;
    }

    return await msgRef.afterClosed().toPromise();
  }

  async confirm(title: string, message: string): Promise<boolean> {
    const msgRef = this.dialog.open(ConfirmDialogComponent, {
      data: {},
      disableClose: true,
      hasBackdrop: true
    });
    msgRef.componentInstance.title = title;
    msgRef.componentInstance.message = message;
    return await msgRef.afterClosed().toPromise();
  }
}
