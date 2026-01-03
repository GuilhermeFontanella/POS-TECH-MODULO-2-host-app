import { loadRemoteModule } from '@angular-architects/module-federation';
import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ScreenType } from 'src/utils/functions/check-screen-size';
import { MFE_ENVIRONMENTS } from 'src/utils/constants/mfeEnvironments';
import { rebuildMfeComponents } from 'src/utils/functions/rebuildMfeComponents';

@Component({
  selector: 'app-navbar',
  template: `
    <ng-container>
      <ng-template #mfeNavbar></ng-template>
    </ng-container>
  `,
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input({ required: true }) screenType: ScreenType = 'desktop';
  @ViewChild('mfeNavbar', { read: ViewContainerRef })
  navbarRef!: ViewContainerRef;
  private componentNavBar: any;

  constructor(private injector: Injector) { }

  async ngOnInit() {
    this.getNavBarMfe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screenType']?.currentValue != changes['screenType']?.previousValue) {
      rebuildMfeComponents(this.navbarRef, this.injector, this.componentNavBar);
    }
  }

  async getNavBarMfe() {
    this.componentNavBar = await loadRemoteModule({
      type: 'module',
      remoteEntry: MFE_ENVIRONMENTS.NavbarComponent,
      exposedModule: './NavbarComponent',
    }).then((m: any) => m.NavbarComponent);

    rebuildMfeComponents(this.navbarRef, this.injector, this.componentNavBar);
  }
}
