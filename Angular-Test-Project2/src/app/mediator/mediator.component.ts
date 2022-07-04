import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-mediator',
  templateUrl: './mediator.component.html',
  styleUrls: ['./mediator.component.css']
})
export class MediatorComponent implements OnInit {
  @Input()
  photoURL:string = '';
  @Input()
  shortSelfPresent:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
