import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private appCom: AppComponent | null = null;

  constructor(private dataService: DataService) { }

  getDirection(lang: string): 'rtl' | 'ltr' {
    let direction: 'rtl' | 'ltr' = 'ltr';

    const langSettings = this.dataService.getLangSettingsSync(lang);
    if (langSettings) {
      direction = langSettings.write_direction as 'rtl' | 'ltr';

      console.log('direction for lang: ' + lang + ' ' + direction);
    }

    return direction;
  }

  getFlowStyle(lang: string): string {
    let style: string = 'ltr_row_flow';

    switch (this.getDirection(lang)) {
      case 'rtl': {
        style = 'rtl_row_flow';
        break;
      }
      default: {
        style = 'ltr_row_flow';
      }
    }

    console.log('flow for lang: ' + lang + ' ' + style);

    return style;
  }

  getDirectionStyle(lang: string): string {
    let style: string = 'direction_ltr';

    switch (this.getDirection(lang)) {
      case 'rtl': {
        style = 'direction_rtl';
        break;
      }
      default: {
        style = 'direction_ltr';
      }
    }

    return style;
  }

  getFromLangFlowStyle(): string {
    return this.getFlowStyle(this.dataService.getFromLang().lang);
  }

  getFromLangDirectionStyle(): string {
    return this.getDirectionStyle(this.dataService.getFromLang().lang);
  }
  getSiteLangFlowStyle(): string {
    return this.getFlowStyle(this.dataService.getSiteLang().lang);
  }
  getSiteLangDirectionStyle(): string {
    return this.getDirectionStyle(this.dataService.getSiteLang().lang);
  }

  setAppRef(appCom: AppComponent) {
    this.appCom = appCom;
  }
 
  showLangToolbar() {
    if (this.appCom) {
      this.appCom.showLangToolbar();
    }
  }

  hideLangToolbar() {
    if (this.appCom) {
      this.appCom.hideLangToolbar();
    }
  }

  openLoadingBox() {
    if (this.appCom) {
      this.appCom.openLoadingBox();
    }
  }

  closeLoadingBox() {
    if (this.appCom) {
      this.appCom.closeLoadingBox();
    }
  }
 
}


