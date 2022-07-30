import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Language } from '../TransfferedObjectsClasses';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fromLang: string = '';
  toLang: string = '';
  availableLanguages: Language[] = [];
  fromLangs: Language[] = [];
  toLangs: Language[] = [];

  constructor(private dataService: DataService,
              private utilsService: UtilsService) { }

  ngOnInit(): void {
    
    this.utilsService.hideLangToolbar();

    if (this.availableLanguages.length === 0) {
      
      this.utilsService.openLoadingBox();

      this.dataService.getAvailableLanguages()
      .then((result) => {
        this.availableLanguages = result;
        console.log('Languages ->');
        console.log(this.availableLanguages);
  
        this.fromLangs = this.availableLanguages.filter(el => el.lang !== '*');
        if (this.fromLangs.length > 0) {
          this.fromLang = this.fromLangs[0].lang; 
        }
  
        this.setToLang();
  
        this.utilsService.closeLoadingBox();
      });

    }
    
  }

  onFromLangChange() {
    console.log('onFromLangChange ->');
    this.setToLang();
  }

  setToLang() {
    this.toLangs = this.availableLanguages.filter(el => el.lang !== this.fromLang);
    if (this.toLangs.length > 0 && (this.toLang === '' || this.toLang === this.fromLang)) {
      this.toLang = this.toLangs[0].lang;
    }
  }

  onGoClicked() {
    this.dataService.setLangs(this.fromLang, this.toLang);
    this.utilsService.showLangToolbar();
  }
}
