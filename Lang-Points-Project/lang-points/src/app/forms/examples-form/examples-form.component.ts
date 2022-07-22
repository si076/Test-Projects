import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Example } from 'src/app/examples/example/example';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-examples-form',
  templateUrl: './examples-form.component.html',
  styleUrls: ['./examples-form.component.css']
})
export class ExamplesFormComponent implements OnInit {

  exampleCompOrederStyle:string = '';
  exampleLabelDirectStyle:string = '';
  exampleInputDirectStyle:string = '';
  exampleLabelText:string = '';

  translationCompOrederStyle:string = '';
  translationLabelDirectStyle:string = '';
  translationInputDirectStyle:string = '';
  translationLabelText:string = '';

  @Input()
  examples: Example[] = [];
  @Output()
  examplesChange: EventEmitter<Example[]> = new EventEmitter<Example[]>();

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.exampleCompOrederStyle = this.utilsService.getToLangFlowStyle();
    this.exampleLabelDirectStyle = this.utilsService.getToLangDirectionStyle();
    this.exampleInputDirectStyle = this.utilsService.getFromLangDirectionStyle();
    this.exampleLabelText = "Please enter the example's text";
  
    this.translationCompOrederStyle = this.utilsService.getToLangFlowStyle();
    this.translationLabelDirectStyle = this.utilsService.getToLangDirectionStyle();
    this.translationInputDirectStyle = this.utilsService.getToLangDirectionStyle();
    this.translationLabelText = "Please enter the example's translation";
    }

    onExampleAdd(): void {
      this.examples.push(new Example());

      this.examplesChange.emit(this.examples);
    }

}
