import { loadRemoteModule } from '@angular-architects/module-federation';
import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { ScreenType } from 'src/utils/functions/check-screen-size';
import { MFE_ENVIRONMENTS } from 'src/utils/constants/mfeEnvironments';
import { rebuildMfeComponents } from 'src/utils/functions/rebuildMfeComponents';

@Component({
  selector: 'app-side-menu',
  template: `
    <ng-container>
      <ng-template #mfeSideMenu></ng-template>
    </ng-container>
  `,
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SideMenuComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
  @Input({ required: true }) screenType: ScreenType = 'desktop';
  @ViewChild('mfeSideMenu', { read: ViewContainerRef })
    sideMenuRef!: ViewContainerRef;
  private componentSideMenu: any;
  private $navbarNavigate?: Subscription;

  constructor(
    private injector: Injector,
    private router: Router
  ) { }

  async ngOnInit() {
    this.getMfeSidemenu();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screenType']?.currentValue != changes['screenType']?.previousValue) {
      rebuildMfeComponents(this.sideMenuRef, this.injector, this.componentSideMenu);
    }
  }

  ngAfterContentInit(): void {
    this.$navbarNavigate = fromEvent<CustomEvent>(window, 'mfe-navbar-navigate')
      .subscribe({
        next: (value: { detail: string }) => this.router.navigate([value?.detail]),
      });
  }

  ngOnDestroy(): void {
    this.$navbarNavigate?.unsubscribe();
  }

  async getMfeSidemenu() {
    this.componentSideMenu = await loadRemoteModule({
      type: 'module',
      remoteEntry: MFE_ENVIRONMENTS.LateralMenuComponent,
      exposedModule: './LateralMenuComponent',
    }).then((m: any) => m.LateralMenuComponent);

    rebuildMfeComponents(this.sideMenuRef, this.injector, this.componentSideMenu);
  }

}