import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LOGIN_LOADER } from 'src/app/ports/mfePort/login/loginLoaderToken';
import { LoginLoaderAdapter } from 'src/infra/loginAdapter';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: LOGIN_LOADER, useClass: LoginLoaderAdapter }
  ]
})
export class LoginPageModule { }
