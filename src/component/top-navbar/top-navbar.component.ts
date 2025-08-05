import { Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { UserDataHandler } from 'src/utils/store-user-data';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  userName: string = '';
  userHandler?: UserDataHandler;
  menuOptions: any[] = [
    {label: 'Sair', path: '/login', id: 'loggout', icon: 'poweroff', dark: false, disabled: false},
    {label: 'Modo escuro', path: '', id: 'theme', icon: 'bulb', dark: false, disabled: false},
    {label: 'Configurações', path: '/', id: 'settings', icon: 'setting', dark: false, disabled: false}
  ];
  isVisible: boolean = false;
  optionSelected: string | null = null;

  @ViewChild('content', { read: ViewContainerRef })
    contentRef!: ViewContainerRef;

  constructor(
    private injector: Injector
  ) {
    this.userHandler = new UserDataHandler();
    this.userName = this.userHandler.getUserName() ?? '';
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
