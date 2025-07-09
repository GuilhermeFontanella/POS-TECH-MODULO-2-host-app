import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ContentWrapperComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { TopNavbarModule } from 'src/component/top-navbar/top-navbar.module';
import { HttpClientModule } from '@angular/common/http';

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
    ContentWrapperComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
