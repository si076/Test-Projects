import { Component, OnInit } from '@angular/core';
import { Mediator } from '../mediator/Mediator';
import { MediatorComponent } from '../mediator/mediator.component';
import { ObjectdispComponent } from '../objectdisp/objectdisp.component';


@Component({
  selector: 'app-mediators',
  templateUrl: './mediators.component.html',
  styleUrls: ['./mediators.component.css']
})
export class MediatorsComponent implements OnInit {

  mediators: Array<Mediator> = [new Mediator('', 'Text1'), 
                                // new Mediator('', 'Text2'),
                                // new Mediator('', 'Text3'),
                                new Mediator('', 'Text4')];

  constructor() { }

  ngOnInit(): void {
  }

}
