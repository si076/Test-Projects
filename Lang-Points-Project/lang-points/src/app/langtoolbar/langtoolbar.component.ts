import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { OnLangsChange } from '../OnLangsChange';
import { Language } from '../TransfferedObjectsClasses';

@Component({
  selector: 'app-langtoolbar',
  templateUrl: './langtoolbar.component.html',
  styleUrls: ['./langtoolbar.component.css']
})
export class LangtoolbarComponent implements OnInit, OnLangsChange {

  fromLang: Language = new Language();
  toLang: Language[] = [];
  siteLang: Language = new Language();

  boxInlineStyle: { [klass: string] : any; } = {};

  siteLangInlineStyle: { [klass: string] : any; }  = {};

  columnsWidth: number = 30; 

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadLangs();

    this.dataService.registerOnLangsChange(this);
  }

  OnLangsChange(): void {
    this.loadLangs();
  }

  loadLangs() {
    console.log('langtoolbar loadLangs ->');

    this.fromLang = this.dataService.getFromLang();
    this.toLang = this.dataService.getToLang();
    this.siteLang = this.dataService.getSiteLang();

    const columnsCount = 1 + 1 + this.toLang.length;
    this.boxInlineStyle = {'grid-template-columns': `repeat(${columnsCount}, ${this.columnsWidth}px)`};

    let index = this.toLang.findIndex(el => el.lang === this.siteLang.lang);
    if (index > -1) {
      index += 3;
      let leftPosition = index * this.columnsWidth;
      this.siteLangInlineStyle = {'left':`${leftPosition}px`};
    }

  }
}
