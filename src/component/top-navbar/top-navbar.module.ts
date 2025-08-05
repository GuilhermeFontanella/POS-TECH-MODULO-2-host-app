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
  ]
})
export class TopNavbarModule {}
