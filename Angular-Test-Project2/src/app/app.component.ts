import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Angular-Test-Project2';


  userMenuPanelHidden = true;
  userMenuPanellClass = 'user_menu_panel';

  constructor() {}

  ngOnInit(): void {
  }

  onUserMenu(): void {
    console.log('onUserMenu');
    if (this.userMenuPanelHidden === true) {
      this.userMenuPanellClass = 'user_menu_panel_visible';
      this.userMenuPanelHidden = false;
    }
    else {
      this.userMenuPanellClass = 'user_menu_panel';
      this.userMenuPanelHidden = true;
    }
  }

}
