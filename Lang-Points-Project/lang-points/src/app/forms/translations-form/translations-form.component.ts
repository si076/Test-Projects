import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-translations-form',
  templateUrl: './translations-form.component.html',
  styleUrls: ['./translations-form.component.css']
})
export class TranslationsFormComponent implements OnInit {

  translation = new FormControl('', Validators.required);

  inputSize = 100;
  textMaxLength = 500;

  remainingCharacters = '0/' + this.textMaxLength;

  componentOrderStyle: string = '';
  transTextDirectStyle: string = '';


  @Input()
  isExampleTranslation:boolean = false;

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    // if (this.isExampleTranslation) {
    //   this.inputSize = 100;
    //   this.textMaxLength = 500;
    // }
    this.componentOrderStyle = this.utilsService.getFromLangFlowStyle();
    
    this.transTextDirectStyle = this.utilsService.getToLangDirectionStyle();

    this.translation.registerOnChange(this.onValueChanged);
  }

  onValueChanged() {
    let value:string = this.translation.value;

    value = value.trim();
    this.remainingCharacters = value.length + '/' + this.textMaxLength;
  }

}
