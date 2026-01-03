import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, Injector, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ScreenType } from 'src/utils/functions/check-screen-size'
import { MFE_ENVIRONMENTS } from 'src/utils/constants/mfeEnvironments';
import { rebuildMfeComponents } from 'src/utils/functions/rebuildMfeComponents';

@Component({
  selector: 'app-home-page',
  template: `
    <ng-container >
      <ng-template #homePageRef></ng-template>
    </ng-container>
  `
})
export class HomePageComponent implements OnInit, OnChanges {
  public screenType: ScreenType = 'desktop';
  private homeComponent: any;
  @ViewChild('homePageRef', { read: ViewContainerRef })
    homePageRef!: ViewContainerRef;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.getMfeHome();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screenType']?.currentValue != changes['screenType']?.previousValue) {
      rebuildMfeComponents(this.homePageRef, this.injector, this.homeComponent);
    }
  }

  async getMfeHome() {
    this.homeComponent = await loadRemoteModule({
      type: 'module',
      remoteEntry: MFE_ENVIRONMENTS.HomeComponent,
      exposedModule: './HomeComponent',
    }).then((m: any) => m.HomeComponent);

    rebuildMfeComponents(this.homePageRef, this.injector, this.homeComponent);
  }
}
