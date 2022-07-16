import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpresent',
  templateUrl: './userpresent.component.html',
  styleUrls: ['./userpresent.component.css']
})
export class UserpresentComponent implements OnInit {

  @Input()
  fullName: string = '';
  
  @Input()
  photo_url: string = '';

  @Input()
  shortSelfPresentation:string = '';

  @Input()
  borderClass:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
