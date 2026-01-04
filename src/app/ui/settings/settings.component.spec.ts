import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ThemeDirectiveModule } from 'src/utils/directives/theme.module';
import { Store } from '@ngrx/store';
import { storeMock } from 'src/utils/directives/theme-applier.directive.spec';
import { THEME_PORT_LOADER } from 'src/app/ports/theme/themePortToken';
import { themePortMock } from 'src/utils/mocks/themePortMock';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';
const icons = [UserOutline];

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        CommonModule,
        NzGridModule,
        NzAvatarModule,
        NzSpaceModule,
        NzDividerModule,
        NzColorPickerModule,
        NzButtonModule,
        ThemeDirectiveModule
      ],
      providers: [
        { provide: THEME_PORT_LOADER, useValue: themePortMock },
        { provide: Store, useValue: storeMock },
        { provide: NZ_ICONS, useValue: icons }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SettingsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call setMainTheme when action is main', () => {
    component.handleChangeThemeAction('main', '#fff');
    expect(themePortMock.setMainTheme).toHaveBeenCalledWith('#fff');
  });

  it('should call themeSecondary when action is main', () => {
    component.handleChangeThemeAction('secondary', '#fff');
    expect(themePortMock.setSecondaryTheme).toHaveBeenCalledWith('#fff');
  });

  it('should call setTitleColor when action is main', () => {
    component.handleChangeThemeAction('title', '#fff');
    expect(themePortMock.setTitleColor).toHaveBeenCalledWith('#fff');
  });

  it('should call setTextColor when action is main', () => {
    component.handleChangeThemeAction('text', '#fff');
    expect(themePortMock.setTextColor).toHaveBeenCalledWith('#fff');
  });

  it('should call setBackgroundColor when action is main', () => {
    component.handleChangeThemeAction('background', '#fff');
    expect(themePortMock.setBackgroundColor).toHaveBeenCalledWith('#fff');
  });

  it('should reset theme', () => {
    component.reset();
    expect(themePortMock.resetTheme).toHaveBeenCalled();
  });
});
