import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ContentWrapperComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { TopNavbarModule } from 'src/component/top-navbar/top-navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {
  MenuOutline,
  UserOutline,
  LogoutOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuOutline, UserOutline, LogoutOutline];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    TopNavbarModule,
    HttpClientModule,
    ContentWrapperComponent,
    NzIconModule
  ],
  providers: [
    {provide: NZ_ICONS, useValue:icons}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
