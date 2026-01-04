import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ScreenType } from 'src/utils/functions/check-screen-size';
import { MfePortLoader } from '../../ports/mfePortLoader.interface';
import { ModuleFederationNavbarLoader } from '../../../infra/navbar';
import { NAVBAR_LOADER } from 'src/app/ports/mfePort/navbar/navbarLoaderToken';

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
  ],
  providers: [
    { provide: NAVBAR_LOADER, useClass: ModuleFederationNavbarLoader }
  ]
})
export class NavbarComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) screenType: ScreenType = 'desktop';
  @ViewChild('mfeNavbar', { read: ViewContainerRef })
    navbarRef!: ViewContainerRef;

  constructor(
    @Inject(NAVBAR_LOADER) private mfeLoader: MfePortLoader
  ) { }

  async ngAfterViewInit() {
    this.mfeLoader.load(this.navbarRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mfeLoader.rebuild(this.navbarRef);
  }

}
