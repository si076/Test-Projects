import { Component, Input, OnInit } from '@angular/core';
import { Example } from './example/example';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent implements OnInit {

  @Input()
  examples: Example[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
