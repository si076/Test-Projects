import { Component } from '@angular/core';
import { Language } from './TransfferedObjectsClasses';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lang-points';

  langtoolbarInlineStyle: { [klass: string] : any; } = {};
  loadingBoxInlineStyle: { [klass: string] : any; } = {};

  constructor(private utilsService: UtilsService) {
    
    this.utilsService.setAppRef(this);
  }

  showLangToolbar() {
    this.langtoolbarInlineStyle = {display:'block'};
  }

  hideLangToolbar() {
    this.langtoolbarInlineStyle = {display:'none'};
  }

  openLoadingBox() {
    this.loadingBoxInlineStyle = {display:'block'};
  }

  closeLoadingBox() {
    this.loadingBoxInlineStyle = {display:'none'};
  }

}
