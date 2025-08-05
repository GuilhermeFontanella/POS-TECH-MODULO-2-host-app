import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ThemeDirectiveModule } from 'src/utils/directives/theme.module';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzAvatarModule,
    NzSpaceModule,
    NzDividerModule,
    NzColorPickerModule,
    NzButtonModule,
    ThemeDirectiveModule
  ]
})
export class SettingsModule { }
