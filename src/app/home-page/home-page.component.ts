import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, HostListener, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { checkScreenSize, ScreenType } from 'src/utils/check-screen-size';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('mfeSidemenu', { read: ViewContainerRef })
        homePageRef!: ViewContainerRef;
  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.screenType = checkScreenSize(window.innerWidth);
    this.rebuildMfeComponents();
  }
  @ViewChild('mfeExtrato', { read: ViewContainerRef })
      extratoRef!: ViewContainerRef;

  public screenType: ScreenType = 'desktop';
  private homeComponent: any;
  private componentExtrato: any;

  constructor(private injector: Injector) {
    this.screenType = checkScreenSize(window.innerWidth);
  }

  ngOnInit(): void {
    this.getMfeExtrato();
    this.getMfeHome();
  }

  async getMfeHome() {
    this.homeComponent = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './HomeComponent',
    }).then((m: any) => m.HomeComponent);

    console.log(this.homeComponent)

    this.homePageRef.createComponent(this.homeComponent, {
      injector: this.injector,
    });
  }

  async getMfeExtrato() {
  this.componentExtrato = await loadRemoteModule({
    type: 'module',
    remoteEntry: 'http://localhost:4204/remoteEntry.js',
    exposedModule: './ExtratoComponent',
  }).then((m: any) => m.ExtratoComponent);

  this.extratoRef.createComponent(this.componentExtrato, {
    injector: this.injector,
  });
}

  private rebuildMfeComponents() {
    setTimeout(() => {
      
        this.homePageRef?.clear();
        this.homePageRef.createComponent(this.homeComponent, {
          injector: this.injector
        });
    }, 10);
  }

}
