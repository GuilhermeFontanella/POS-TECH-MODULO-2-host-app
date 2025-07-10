import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, HostListener, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { fromEvent, Subscription } from 'rxjs';
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
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  screenType: ScreenType = 'desktop';
  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.screenType = checkScreenSize(window.innerWidth);
    this.rebuildMfeComponents();
  } 
  @ViewChild('mfeNavbar', { read: ViewContainerRef })
      navbarRef!: ViewContainerRef;
  @ViewChild('mfeSidemenu', { read: ViewContainerRef })
      sideMenuRef!: ViewContainerRef;
  
  
  title = 'mfe-host';
  private componentNavBar: any;
  private componentSideMenu: any;
  private $navbarNavigate?: Subscription;

  constructor(
    private injector: Injector,
    private router: Router
  ) {
    this.screenType = checkScreenSize(window.innerWidth);
  }

  async ngOnInit() {
    this.getMfeSidemenu();
    this.getNavBarMfe();
  }

  ngAfterContentInit(): void {
    this.$navbarNavigate = fromEvent<CustomEvent>(window, 'mfe-navbar-navigate')
      .subscribe({
        next: (value: {detail: string}) => this.router.navigate([value?.detail]),
      });
  }

  ngOnDestroy(): void {
    this.$navbarNavigate?.unsubscribe();
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

  private rebuildMfeComponents() {
    setTimeout(() => {
      if (this.screenType === 'mobile' || this.screenType === 'tablet') {
        this.navbarRef?.clear();
        this.navbarRef.createComponent(this.componentNavBar, {
          injector: this.injector
        });
      } else if (this.screenType === 'desktop') {
        this.sideMenuRef?.clear();
        this.sideMenuRef.createComponent(this.componentSideMenu, {
          injector: this.injector,
        });
      }
    }, 10);
  }
}
