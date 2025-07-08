import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostPageRoutingModule } from './host-page-routing.module';
import { HostPageComponent } from './host-page.component';


@NgModule({
  declarations: [
    HostPageComponent
  ],
  imports: [
    CommonModule,
    HostPageRoutingModule
  ]
})
export class HostPageModule { }
