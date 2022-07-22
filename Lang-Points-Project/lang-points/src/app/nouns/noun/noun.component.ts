import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { UtilsService } from 'src/app/utils.service';
import { Noun } from './noun';

@Component({
  selector: 'app-noun',
  templateUrl: './noun.component.html',
  styleUrls: ['./noun.component.css']
})
export class NounComponent implements OnInit {

  componentOrderStyle: string = '';
  wordTextDirectionStyle: string = '';
  transTextDirectStyle: string = '';

  // translations: string = '';

  @Input()
  noun: Noun  = new Noun(); 

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.componentOrderStyle = this.utilsService.getFromLangFlowStyle();
    
    this.wordTextDirectionStyle = this.utilsService.getFromLangDirectionStyle(); 
      
    this.transTextDirectStyle = this.utilsService.getToLangDirectionStyle();

    // console.log(this.noun.translations);

    // this.noun.translations.forEach(el => { this.translations += ' ' + el});

    // console.log(this.translations);
  }

}
