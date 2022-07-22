import { Component, Input, OnInit } from '@angular/core';
import { Noun } from 'src/app/nouns/noun/noun';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-noun-form',
  templateUrl: './noun-form.component.html',
  styleUrls: ['./noun-form.component.css']
})
export class NounFormComponent implements OnInit {

  compOrderStyle: string = '';
  inputDirectStyle: string = '';
  labelDirectStyle: string = '';

  translationCompOrederStyle:string = '';
  translationLabelDirectStyle:string = '';
  translationInputDirectStyle:string = '';
  translationLabelText:string = '';

  @Input()
  noun: Noun = new Noun();

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.compOrderStyle = this.utilsService.getFromLangFlowStyle();
    this.labelDirectStyle = this.utilsService.getToLangDirectionStyle();
    this.inputDirectStyle = this.utilsService.getFromLangDirectionStyle();

    this.translationCompOrederStyle = this.utilsService.getToLangFlowStyle();
    this.translationLabelDirectStyle = this.utilsService.getToLangDirectionStyle();
    this.translationInputDirectStyle = this.utilsService.getToLangDirectionStyle();
    this.translationLabelText = "Please enter one or more transaltions of the word, separated by comma(,) or semicolon(;)";
  }

}
