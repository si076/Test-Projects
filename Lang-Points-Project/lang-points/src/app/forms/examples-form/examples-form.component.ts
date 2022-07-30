import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Example, ExampleTranslation, Language } from 'src/app/TransfferedObjectsClasses';
import { UtilsService } from 'src/app/utils.service';
import { TranslObjInt } from 'src/app/InternalClasses';

@Component({
  selector: 'app-examples-form',
  templateUrl: './examples-form.component.html',
  styleUrls: ['./examples-form.component.css']
})
export class ExamplesFormComponent implements OnInit {
  
  fromLang: Language = new Language();

  exampleCompOrederStyle:string = '';
  exampleLabelDirectStyle:string = '';
  exampleInputDirectStyle:string = '';
  exampleLabelText:string = '';

  translationLabelText:string = '';

  @Input()
  examples: Example[] = [];
  @Output()
  examplesChange: EventEmitter<Example[]> = new EventEmitter<Example[]>();

  examplesTranslations: TranslObjInt[][] = [];

  availableLangsForTrans: Language[] = [];
  langForTrans: string = '';


  constructor(private utilsService: UtilsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.fromLang = this.dataService.getFromLang();

    this.exampleCompOrederStyle = this.utilsService.getFromLangFlowStyle();
    this.exampleLabelDirectStyle = this.utilsService.getDirectionStyle(this.dataService.getSiteLang().lang);
    this.exampleInputDirectStyle = this.utilsService.getFromLangDirectionStyle();
    this.exampleLabelText = "Please enter the example's text";
  
    this.translationLabelText = "Please enter the example's translation";
    }

    onExampleAdd(): void {
      const example = new Example();
      example.translations.push(new ExampleTranslation(this.dataService.getSiteLang().lang));

      this.examples.push(example);

      const exampleTranslations: TranslObjInt[] = [];
      exampleTranslations.push(TranslObjInt.createTranslObjInt(
                                  this.dataService.getSiteLang().lang, 
                                  '',
                                  this.dataService,
                                  this.utilsService));

      this.examplesTranslations.push(exampleTranslations);

      this.determineAvailableLangsForTrans(this.examples.length - 1);

      this.examplesChange.emit(this.examples);
    }

    determineAvailableLangsForTrans(index: number) {
      this.availableLangsForTrans = this.dataService.getToLang();
     
      console.log(this.availableLangsForTrans);
      
      this.availableLangsForTrans = 
        this.availableLangsForTrans.filter(
                el => el.lang !== '*' &&
                      (-1 === this.examples[index].translations.findIndex(trEl => trEl.lang === el.lang)));
      console.log(this.availableLangsForTrans);
  
      if (this.availableLangsForTrans.length > 0) {
        this.langForTrans = this.availableLangsForTrans[0].lang;
      }
    }
  
    onAddTranslation(index: number) {
      console.log('onAddTranslation');
      this.examples[index].translations.push(new ExampleTranslation(this.langForTrans));
      this.examplesTranslations[index].push(TranslObjInt.createTranslObjInt(this.langForTrans, 
                                              '',
                                              this.dataService,
                                              this.utilsService));
          
      this.determineAvailableLangsForTrans(index);
    }
  

}
