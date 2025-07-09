import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, HostListener, Injector, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { checkScreenSize, ScreenType } from 'src/utils/check-screen-size';

@Component({
  selector: 'app-component-wrapper',
  template: `
    <nz-content>
      <router-outlet></router-outlet>
    </nz-content>
  `,
  standalone: true,
  imports: [NzLayoutModule, RouterModule]
})
export class ContentWrapperComponent {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  screenType: ScreenType = 'desktop';
  @HostListener('window:resize', ['$event']) onWindowResize() {
    console.log(checkScreenSize(window.innerWidth))
    this.screenType = checkScreenSize(window.innerWidth);
  }
  @ViewChild('mfeNavbar', { read: ViewContainerRef })
      navbarRef!: ViewContainerRef;
  @ViewChild('mfeSidemenu', { read: ViewContainerRef })
      sideMenuRef!: ViewContainerRef;
  
  
  title = 'mfe-host';
  private componentNavBar: any;
  private componentSideMenu: any;

  constructor(private injector: Injector) {
    this.screenType = checkScreenSize(window.innerWidth);
  }

  async ngOnInit() {
    this.getMfeSidemenu();
    this.getNavBarMfe();     
  }

  async getNavBarMfe() {
    this.componentNavBar = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './NavbarComponent',
    }).then((m: any) => m.NavbarComponent);

    this.navbarRef.createComponent(this.componentNavBar, {
      injector: this.injector,
    });
  }

  async getMfeSidemenu() {
    this.componentSideMenu = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './LateralMenuComponent',
    }).then((m: any) => m.LateralMenuComponent);

    this.sideMenuRef.createComponent(this.componentSideMenu, {
      injector: this.injector,
    });
  }
}
