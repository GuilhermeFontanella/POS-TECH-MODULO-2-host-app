import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzLayoutModule } from "ng-zorro-antd/layout";


@Component({
  selector: 'app-component-wrapper',
  template: `
    <nz-content>
      <router-outlet></router-outlet>
    </nz-content>
  `,
  standalone: true,
  imports: [NzLayoutModule, RouterModule]
})
export class ContentWrapperComponent { }