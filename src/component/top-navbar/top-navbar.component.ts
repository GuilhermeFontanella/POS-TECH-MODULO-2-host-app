import { Component, Inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { SettingsComponent } from '../settings/settings.component';
import { MenuOption } from 'src/utils/model/menuOption';
import { UserDataPort } from 'src/app/ports/userData/userDataPort';
import { USER_DATA_PORT } from 'src/app/ports/userData/userDataToken';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  userName: string = '';
  menuOptions: MenuOption[] = [
    {label: 'Sair', path: '/login', id: 'logout', icon: 'poweroff', dark: false, disabled: false},
    {label: 'Modo escuro', path: '', id: 'theme', icon: 'bulb', dark: false, disabled: false},
    {label: 'Configurações', path: '/', id: 'settings', icon: 'setting', dark: false, disabled: false}
  ];
  isVisible: boolean = false;
  optionSelected: string | null = null;

  @ViewChild('content', { read: ViewContainerRef })
    contentRef!: ViewContainerRef;

  constructor(
    private injector: Injector,
    @Inject(USER_DATA_PORT) private userData: UserDataPort
  ) {
    this.userName = this.userData.getUserName() ?? '';
  }

  handleOptionClick(event: any) {
    this.optionSelected = event.label;
    switch (event.id) {
      case 'loggout':
        return null;
      case 'theme':
        return null;
      case 'settings':
        return this.isVisible = true;
      default:
        return null
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  loadSettingsComponent() {
    this.isVisible = true;
    this.contentRef.createComponent(SettingsComponent, {
      injector: this.injector
    })
  }
}
