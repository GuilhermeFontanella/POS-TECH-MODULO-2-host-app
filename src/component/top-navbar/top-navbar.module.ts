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
import { ThemeApplierDirective } from 'src/utils/directives/theme-applier.directive';
import { ThemeDirectiveModule } from 'src/utils/directives/theme.module';
import { USER_DATA_PORT } from 'src/app/ports/userData/userDataToken';
import { UserData } from 'src/infra/userData';
import { LOCAL_STORAGE } from 'src/app/ports/storage/localStorage.token';

@NgModule({
  declarations: [
    TopNavbarComponent,
    
  ],
  exports: [
    TopNavbarComponent
  ],
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
    { provide: USER_DATA_PORT, useClass: UserData },
    { provide: LOCAL_STORAGE, useValue: localStorage },
  ]
})
export class TopNavbarModule {}
