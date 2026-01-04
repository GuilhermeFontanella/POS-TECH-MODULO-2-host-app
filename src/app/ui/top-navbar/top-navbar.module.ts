import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SettingsModule } from '../settings/settings.module';
import { ThemeDirectiveModule } from 'src/utils/directives/theme.module';
import { USER_DATA_PORT } from 'src/app/ports/userData/userDataToken';
import { UserData } from 'src/infra/userData';
import { LOCAL_STORAGE } from 'src/app/ports/storage/localStorage.token';
import { TOP_NAVBAR } from 'src/app/ports/topnavbar/topNavbarToken';
import { TopNavbarAdapter } from 'src/infra/topNavbarAdapter';

@NgModule({
  declarations: [TopNavbarComponent],
  exports: [TopNavbarComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzMenuModule,
    NzSpaceModule,
    NzIconModule,
    NzModalModule,
    SettingsModule,
    ThemeDirectiveModule
  ],
  providers: [
    { provide: TOP_NAVBAR, useClass: TopNavbarAdapter },
    { provide: USER_DATA_PORT, useClass: UserData },
    { provide: LOCAL_STORAGE, useValue: localStorage },
  ]
})
export class TopNavbarModule {}
