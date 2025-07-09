import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';


@NgModule({
  declarations: [
    TopNavbarComponent
  ],
  exports: [
    TopNavbarComponent
  ],
  imports: [
    CommonModule,
    NzAvatarModule
  ]
})
export class TopNavbarModule { }
