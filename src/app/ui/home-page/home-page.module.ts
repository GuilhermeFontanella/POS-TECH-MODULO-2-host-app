import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeLoaderAdapter } from 'src/infra/homeAdapter';
import { HOME_LOADER } from 'src/app/ports/mfePort/home/homeLoaderToken';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HOME_LOADER, useClass: HomeLoaderAdapter }
  ]
})
export class HomePageModule { }
