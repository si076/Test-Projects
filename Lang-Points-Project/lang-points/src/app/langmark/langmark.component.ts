import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../TransfferedObjectsClasses';

@Component({
  selector: 'app-langmark',
  templateUrl: './langmark.component.html',
  styleUrls: ['./langmark.component.css']
})
export class LangmarkComponent implements OnInit {

  @Input()
  lang: Language = new Language();

  constructor() { }

  ngOnInit(): void {
  }

}
