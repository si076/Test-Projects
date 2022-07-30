import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Example } from 'src/app/TransfferedObjectsClasses';
import { UtilsService } from 'src/app/utils.service';
import { TranslObjInt } from 'src/app/InternalClasses';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  componentOrderStyle: string = '';
  wordTextDirectionStyle: string = '';

  @Input()
  example: Example = new Example();

  exampleTranslations: TranslObjInt[] = [];
  
  constructor(private utilsService: UtilsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.componentOrderStyle = this.utilsService.getFromLangFlowStyle();
    
    this.wordTextDirectionStyle = this.utilsService.getFromLangDirectionStyle(); 
    
    this.example.translations.forEach(el => {
      this.exampleTranslations.push(TranslObjInt.createTranslObjInt(
                                        el.lang, 
                                        el.translation,
                                        this.dataService,
                                        this.utilsService));

    });
  }

}
