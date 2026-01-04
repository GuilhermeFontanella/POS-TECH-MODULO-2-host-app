import { AfterViewInit, Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ScreenType } from 'src/utils/functions/check-screen-size'
import { PortLoader } from 'src/app/ports/portLoader.interface';
import { HOME_LOADER } from 'src/app/ports/home/homeLoaderToken';

@Component({
  selector: 'app-home-page',
  template: `
    <ng-container >
      <ng-template #homePageRef></ng-template>
    </ng-container>
  `
})
export class HomePageComponent implements AfterViewInit, OnChanges {
  public screenType: ScreenType = 'desktop';
  @ViewChild('homePageRef', { read: ViewContainerRef })
    homePageRef!: ViewContainerRef;

  constructor(@Inject(HOME_LOADER) private mfeLoader: PortLoader) {}

  async ngAfterViewInit() {
    this.mfeLoader.load(this.homePageRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mfeLoader.rebuild(this.homePageRef);
  }
}
