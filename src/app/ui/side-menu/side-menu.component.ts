import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, Inject, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { ScreenType } from 'src/utils/functions/check-screen-size';
import { ModuleFederationSideMenuLoader } from '../../../infra/sideMenu';
import { MfePortLoader } from '../../ports/mfePortLoader.interface';
import { SIDE_MENU_LOADER } from 'src/app/ports/mfePort/sideMenu/sideMenuLoaderToken';

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
  ],
  providers: [
    { provide:  SIDE_MENU_LOADER, useClass: ModuleFederationSideMenuLoader }
  ]
})
export class SideMenuComponent implements AfterViewInit, AfterContentInit, OnDestroy, OnChanges {
  @Input({ required: true }) screenType: ScreenType = 'desktop';
  @ViewChild('mfeSideMenu', { read: ViewContainerRef })
    sideMenuRef!: ViewContainerRef;
  private $navbarNavigate?: Subscription;

  constructor(
    @Inject(SIDE_MENU_LOADER) private mfeLoader: MfePortLoader,
    private router: Router
  ) { }

  async ngAfterViewInit() {
    this.mfeLoader.load(this.sideMenuRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mfeLoader.rebuild(this.sideMenuRef);
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

}