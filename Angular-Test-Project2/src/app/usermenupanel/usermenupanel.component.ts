import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-usermenupanel',
  templateUrl: './usermenupanel.component.html',
  styleUrls: ['./usermenupanel.component.css']
})
export class UsermenupanelComponent implements OnInit, OnChanges {

  userMenuPanellClass:string = 'user_menu_panel';

  @Input()
  userMenuCtx:boolean = false

  @Input()
  userMenuPanelHidden:boolean = false;
  @Output() userMenuPanelHiddenChange = new EventEmitter<boolean>();

  userActions: {actionName: string, link: string}[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (this.userMenuCtx) {
      this.userMenuPanellClass = 'user_menu_panel_ctx';
    }

    let action = {actionName: 'Потребителски профил', link:  'userprofile'};
    this.userActions.push(action);

    action = {actionName: 'Управление на събития', link:  'usereventsman'};
    this.userActions.push(action);

    if (this.dataService.getUserRights().canUserObjectManagement()) {
      action = {actionName: 'Управление на обекти', link:  'userobjman'};
      this.userActions.push(action);
    }

    if (this.dataService.getUserRights().canUserManagement()) {
      action = {actionName: 'Управление на потребители', link:  'userman'};
      this.userActions.push(action);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);

    if (this.userMenuCtx === true &&
        (changes.userMenuPanelHidden !== undefined) && 
        changes.userMenuPanelHidden.isFirstChange() === false) {

      if (this.userMenuPanelHidden) {
        this.userMenuPanellClass = 'user_menu_panel_ctx';
      } else {
        this.userMenuPanellClass = 'user_menu_panel_ctx_visible';
      }    

    }
  }

  onMouseLeave() {
    // console.log('onMouseLeave');
    if (this.userMenuCtx === true) {
      this.userMenuPanelHidden = true;
      this.userMenuPanellClass = 'user_menu_panel_ctx';
      this.userMenuPanelHiddenChange.emit(this.userMenuPanelHidden);
    }
  }

}
