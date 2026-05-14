import { Component, Inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { SettingsComponent } from '../settings/settings.component';
import { MenuOption } from 'src/utils/model/menuOption';
import { Observable } from 'rxjs';
import { TOP_NAVBAR } from 'src/app/ports/topnavbar/topNavbarToken';
import { TopNavbarPort } from 'src/app/ports/topnavbar/topNavbarPort';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  userName!:string;
  menuOptions$!: Observable<MenuOption[]>;
  isVisible: boolean = false;
  optionSelected: string | null = null;

  @ViewChild('content', { read: ViewContainerRef })
    contentRef!: ViewContainerRef;

  constructor(
    private injector: Injector,
    @Inject(TOP_NAVBAR) private topNavbar: TopNavbarPort
  ) {
    this.userName = this.topNavbar.getUserName() ?? '';
    this.menuOptions$ = this.topNavbar.menuOptions$();
  }

  handleOptionClick(event: any) {
    switch (event.id) {
      case 'logout':
        return this.topNavbar.logout();
      case 'theme':
        return this.topNavbar.toggleTheme();
      case 'settings':
        this.topNavbar.openSettings();
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
    });
  }
}
