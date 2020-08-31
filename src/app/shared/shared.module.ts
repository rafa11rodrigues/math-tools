import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WarningModalComponent } from './modal/warning-modal/warning-modal.component';



@NgModule({
  declarations: [
    WarningModalComponent,
  ],
  entryComponents: [
    WarningModalComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    WarningModalComponent,
  ]
})
export class SharedModule { }
