import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.css']
})
export class TextFormComponent implements OnInit, OnChanges {

  @Input()
  inputSize = 100;
  @Input()
  textMaxLength = 500;

  remainingCharacters = '0/' + this.textMaxLength;

  text:string = '';
  @Input()
  textFromParent:string = '';
  @Output()
  textFromParentChange:EventEmitter<string> = new EventEmitter<string>();
  @Input()
  componentOrderStyle: string = '';
  @Input()
  inputDirectStyle: string = '';
  @Input()
  labelDirectStyle: string = '';
  @Input()
  labelText: string = '';
  
  constructor() { }

  ngOnInit(): void {
    this.text = this.textFromParent;
  }

  onInput() {
    // console.log('onInit->' + this.text);
    this.remainingCharacters = this.text.length + '/' + this.textMaxLength;

     
    this.textFromParentChange.emit(this.text);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges->');
    console.log(changes);

    const chng = changes['textFromParent'];
    if (chng) {
      console.log('Change curr value:' + chng.currentValue + ' textFromParent field curr value:' + this.textFromParent);
      this.text = this.textFromParent;
    }
    

  }

}
