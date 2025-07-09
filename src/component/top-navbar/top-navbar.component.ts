import { Component } from '@angular/core';
import { UserDataHandler } from 'src/utils/store-user-data';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  userName: string = '';
  userHandler?: UserDataHandler;

  constructor() {
    this.userHandler = new UserDataHandler();
    this.userName = this.userHandler.getUserName() ?? '';
  }

}
