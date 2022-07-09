import { Component, Input, OnInit } from '@angular/core';
import { CatObject } from '../CatObject';
import { CatObjectIntf } from '../CatObjectIntf';
import { MeasurementUnits } from '../data.service';

@Component({
  selector: 'app-objectdisp',
  templateUrl: './objectdisp.component.html',
  styleUrls: ['./objectdisp.component.css']
})
export class ObjectdispComponent implements OnInit {

  // type: string = '';
  // title: string = '';
  // description: string = '';
  // duration: number = 0;
  // participantNumber: number = 0;
  // locations: string[] = [];
  // prices: { minParticipants: number; maxParticipants: number; price: number; }[] = [];
  // firstMeetingFreeOfCharge: boolean = false;
  // backgroundColour: { r: number, g: number, b: number, a: number } = {r: 0, g: 0, b: 0, a: 0};

  @Input()
  catObj: CatObjectIntf = new CatObject('', '', '', 0, [], [], false, {r: 0, g: 0, b: 0, a: 0});

  @Input()
  measurementUnits:MeasurementUnits = {duration: '', participantNumber: '', price: ''};

  currentStyles: Record<string, string> = {};

  constructor() { }

  ngOnInit(): void {

    this.currentStyles = 
      {'background-color': `rgba(${this.catObj.getBackgroundColour().r}, ${this.catObj.getBackgroundColour().g}, ${this.catObj.getBackgroundColour().b}, ${this.catObj.getBackgroundColour().a})`
      };

    // console.log(this.currentStyles);                      
  }

}
