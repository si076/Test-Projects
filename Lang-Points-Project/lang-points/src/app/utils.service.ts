import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  fromLang: string = '';
  toLang: string = '';

  constructor() { }

  setLangs(fromLang: string, toLang: string) {
    this.fromLang = fromLang;
    this.toLang = toLang;
  }

  getDirection(lang: string): 'rtl' | 'ltr' {
    let direction: 'rtl' | 'ltr' = 'ltr';

    switch (lang) {
      case 'ar': {
        direction = 'rtl';
        break;
      }
      default: {
        direction = 'ltr';
      }
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
    return this.getFlowStyle(this.fromLang);
  }

  getFromLangDirectionStyle(): string {
    return this.getDirectionStyle(this.fromLang);
  }
  getToLangFlowStyle(): string {
    return this.getFlowStyle(this.toLang);
  }
  getToLangDirectionStyle(): string {
    return this.getDirectionStyle(this.toLang);
  }
}


