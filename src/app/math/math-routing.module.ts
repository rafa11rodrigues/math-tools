import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombinatorialAnalysisComponent } from './combinatorial-analysis/combinatorial-analysis.component';


const routes: Routes = [
  { path: '', redirectTo: 'combinatorial-analysis', pathMatch: 'full' },
  { path: 'combinatorial-analysis', component: CombinatorialAnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MathRoutingModule { }
