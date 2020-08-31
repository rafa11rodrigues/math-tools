import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathRoutingModule } from './math-routing.module';
import { CombinatorialAnalysisComponent } from './combinatorial-analysis/combinatorial-analysis.component';
import { SharedModule } from '../shared/shared.module';
import { FactorialComponent } from './combinatorial-analysis/factorial/factorial.component';
import { ElementInputComponent } from './combinatorial-analysis/element-input/element-input.component';
import { ArrangementComponent } from './combinatorial-analysis/arrangement/arrangement.component';


@NgModule({
  declarations: [
    CombinatorialAnalysisComponent,
    FactorialComponent,
    ElementInputComponent,
    ArrangementComponent
  ],
  imports: [
    CommonModule,
    MathRoutingModule,
    SharedModule,
  ],
})
export class MathModule { }
