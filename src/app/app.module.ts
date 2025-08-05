import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ContentWrapperComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { TopNavbarModule } from 'src/component/top-navbar/top-navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {
  MenuOutline,
  UserOutline,
  LogoutOutline,
  EyeInvisibleFill,
  EyeFill,
  PoweroffOutline,
  BulbOutline,
  BulbFill,
  SettingOutline
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StoreModule } from '@ngrx/store';
import { themeReducer } from 'src/utils/reducers/them.reducer';
import { ThemeApplierDirective } from '../utils/directives/theme-applier.directive';
import { ThemeDirectiveModule } from 'src/utils/directives/theme.module';

const icons = [
  MenuOutline,
  UserOutline,
  LogoutOutline,
  EyeFill,
  EyeInvisibleFill,
  PoweroffOutline,
  BulbOutline,
  BulbFill,
  SettingOutline
];

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
    NzIconModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({theme: themeReducer}),
    ThemeDirectiveModule

  ],
  providers: [
    {provide: NZ_ICONS, useValue:icons}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
