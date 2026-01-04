import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarComponent } from './top-navbar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { THEME_PORT_LOADER } from 'src/app/ports/theme/themePortToken';
import { storeMock } from 'src/utils/directives/theme-applier.directive.spec';
import { ThemeDirectiveModule } from 'src/utils/directives/theme.module';
import { themePortMock } from 'src/utils/mocks/themePortMock';
import { SettingsModule } from '../settings/settings.module';
import { PoweroffOutline, BulbOutline, SettingOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { TOP_NAVBAR } from 'src/app/ports/topnavbar/topNavbarToken';
import { TopNavbarAdapter } from 'src/infra/topNavbarAdapter';
import { UserData } from 'src/infra/userData';
import { USER_DATA_PORT } from 'src/app/ports/userData/userDataToken';
import { LOCAL_STORAGE } from 'src/app/ports/storage/localStorage.token';
const icons = [PoweroffOutline, BulbOutline, SettingOutline, UserOutline];

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavbarComponent],
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
        { provide: THEME_PORT_LOADER, useValue: themePortMock },
        { provide: TOP_NAVBAR, useClass: TopNavbarAdapter },
        { provide: USER_DATA_PORT, useClass: UserData },
        { provide: LOCAL_STORAGE, useValue: localStorage },
        { provide: Store, useValue: storeMock },
        { provide: NZ_ICONS, useValue: icons }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
