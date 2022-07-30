import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Characteristics, LangSettings, Language, Noun, WordTranslations } from 'src/app/TransfferedObjectsClasses';
import { UtilsService } from 'src/app/utils.service';
import { TranslObjInt } from 'src/app/InternalClasses';

@Component({
  selector: 'app-noun-form',
  templateUrl: './noun-form.component.html',
  styleUrls: ['./noun-form.component.css']
})
export class NounFormComponent implements OnInit {

  fromLang: Language = new Language();
  fromLangSettings:LangSettings = new LangSettings();

  characteristics: Characteristics = new Characteristics();

  compOrderStyle: string = '';
  inputDirectStyle: string = '';
  labelDirectStyle: string = '';

  translationCompOrederStyle:string = '';
  translationLabelDirectStyle:string = '';
  translationInputDirectStyle:string = '';
  translationLabelText:string = '';

  @Input()
  noun: Noun = new Noun();

  translations: TranslObjInt[] = [];

  availableLangsForTrans: Language[] = [];
  langForTrans: string = '';

  constructor(private utilsService: UtilsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.fromLang = this.dataService.getFromLang();
    this.fromLangSettings = this.dataService.getLangSettingsSync(this.fromLang.lang)!;

    if (this.dataService.getCharacteristicsSync()) {
      this.characteristics = this.dataService.getCharacteristicsSync()!;
    }

    this.compOrderStyle = this.utilsService.getFromLangFlowStyle();
    this.labelDirectStyle = this.utilsService.getDirectionStyle(this.dataService.getSiteLang().lang);
    this.inputDirectStyle = this.utilsService.getFromLangDirectionStyle();

    this.translationLabelText = "Please enter one or more transaltions of the word, separated by comma(,) or semicolon(;)";

    if (this.noun.translations.length === 0) {
      this.noun.translations.push(new WordTranslations(this.dataService.getSiteLang().lang)); 
    }

    this.noun.translations.forEach(el => {
      
      this.translations.push(TranslObjInt.createTranslObjInt(el.lang, 
                                                             el.translations.join(),
                                                             this.dataService,
                                                             this.utilsService));
    });

    this.determineAvailableLangsForTrans();

  }

  determineAvailableLangsForTrans() {
    this.availableLangsForTrans = this.dataService.getToLang();
   
    console.log(this.availableLangsForTrans);
    
    this.availableLangsForTrans = 
      this.availableLangsForTrans.filter(
              el => el.lang !== '*' &&
                    (-1 === this.translations.findIndex(trEl => trEl.lang.lang === el.lang)));
    console.log(this.availableLangsForTrans);

    if (this.availableLangsForTrans.length > 0) {
      this.langForTrans = this.availableLangsForTrans[0].lang;
    }
  }

  onAddTranslation() {
    console.log('onAddTranslation');
    this.noun.translations.push(new WordTranslations(this.langForTrans));
    this.translations.push(TranslObjInt.createTranslObjInt(this.langForTrans, 
                              '',
                              this.dataService,
                              this.utilsService));
        
    this.determineAvailableLangsForTrans();
  }


}
