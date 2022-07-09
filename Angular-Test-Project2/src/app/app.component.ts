import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Angular-Test-Project2';

  userMenuPanelHidden: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  onUserMenu(): void {
    // console.log('onUserMenu ' + this.userMenuPanelHidden);
    if (this.userMenuPanelHidden === true) {
      this.userMenuPanelHidden = false;
    }
    else {
      this.userMenuPanelHidden = true;
    }
  }

}
