import { AfterViewInit, Component, Inject, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ScreenType } from 'src/utils/functions/check-screen-size'
import { MfePortLoader } from 'src/app/ports/mfePortLoader.interface';
import { LOGIN_LOADER } from 'src/app/ports/mfePort/login/loginLoaderToken';


@Component({
  selector: 'app-login-page',
  template: `
    <ng-container >
      <ng-template #loginPageRef></ng-template>
    </ng-container>
  `
})
export class LoginPageComponent implements AfterViewInit, OnChanges {
  public screenType: ScreenType = 'desktop';
  @ViewChild('loginPageRef', { read: ViewContainerRef })
    loginPageRef!: ViewContainerRef;

  constructor(@Inject(LOGIN_LOADER) private mfeLoader: MfePortLoader) {}

  async ngAfterViewInit() {
    this.mfeLoader.load(this.loginPageRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mfeLoader.rebuild(this.loginPageRef);
  }
}
