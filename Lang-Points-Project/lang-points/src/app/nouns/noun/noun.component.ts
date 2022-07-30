import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Noun } from 'src/app/TransfferedObjectsClasses';
import { UtilsService } from 'src/app/utils.service';
import { TranslObjInt } from 'src/app/InternalClasses';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html',
  styleUrls: ['./noun.component.css']
})
export class NounComponent implements OnInit {

  componentOrderStyle: string = '';
  wordTextDirectionStyle: string = '';

  // translations: string = '';

  @Input()
  noun: Noun  = new Noun(); 

  translations: TranslObjInt[] = [];


  constructor(private utilsService: UtilsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.componentOrderStyle = this.utilsService.getFromLangFlowStyle();
    
    this.wordTextDirectionStyle = this.utilsService.getFromLangDirectionStyle(); 

    this.noun.translations.forEach(el => {
      
      this.translations.push(TranslObjInt.createTranslObjInt(el.lang, 
                                                             el.translations.join(),
                                                             this.dataService,
                                                             this.utilsService));
    });
    
  }

}
