import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, HostListener, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.screenType = checkScreenSize(window.innerWidth);
  }
  @ViewChild('mfe', { read: ViewContainerRef, static: true })
      viewContainerRef!: ViewContainerRef;
  public screenType: ScreenType = 'desktop';
  title = 'mfe-host';

  constructor(private injector: Injector) {}

  async ngOnInit() {
      const component: any = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './NavbarComponent',
      }).then((m: any) => m.NavbarComponent);
  
      this.viewContainerRef.createComponent(component, {
        injector: this.injector,
      });
    }
}
