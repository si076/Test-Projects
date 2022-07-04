import { Component, OnInit } from '@angular/core';

import {DataService} from './data.service';
import type {Category} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Angular-Test-Project2';

  categories: Category[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();
  }

}
