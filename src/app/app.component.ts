import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { checkScreenSize, ScreenType } from 'src/utils/functions/check-screen-size';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLayout: boolean = true;
  screenType: ScreenType = 'desktop';
  title = 'mfe-host';
  @HostListener('window:resize') onWindowResize() {
    this.screenType = checkScreenSize(window.innerWidth);
  }

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showLayout = !event.url.includes('/login');
      });
  }


}
