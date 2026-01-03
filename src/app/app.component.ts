import { Component, HostListener } from '@angular/core';
import { checkScreenSize, ScreenType } from 'src/utils/functions/check-screen-size';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  screenType: ScreenType = 'desktop';
  title = 'mfe-host';
  @HostListener('window:resize') onWindowResize() {
    this.screenType = checkScreenSize(window.innerWidth);
  }
}
