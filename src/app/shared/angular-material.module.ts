import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatTabsModule,
  MatRadioModule,
  MatDialogModule,
  MatTooltipModule,
} from '@angular/material';

const deps = [
  MatInputModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatRadioModule,
  MatDialogModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...deps,
  ],
  exports: [
    ...deps,
  ]
})
export class AngularMaterialModule { }
