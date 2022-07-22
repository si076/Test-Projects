import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { UtilsService } from 'src/app/utils.service';
import { Example } from './example';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  componentOrderStyle: string = '';
  wordTextDirectionStyle: string = '';
  transTextDirectStyle: string = '';

  @Input()
  example: Example = new Example();
  
  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.componentOrderStyle = this.utilsService.getFromLangFlowStyle();
    
    this.wordTextDirectionStyle = this.utilsService.getFromLangDirectionStyle(); 
      
    this.transTextDirectStyle = this.utilsService.getToLangDirectionStyle();
  }

}
