import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  @Input() title: string;
    @Input() message: string;
    @Input() buttonText = 'Close';

    constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}
