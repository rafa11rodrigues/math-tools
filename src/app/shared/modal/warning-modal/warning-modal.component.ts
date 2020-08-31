import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title || '';
    this.message = data.message || '';
  }

  title = '';
  message = '';
}
