import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent, NavmenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    NavmenuComponent,
  ]
})
export class CoreModule { }
