import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewChecked, AfterViewInit {

  categories: Category[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.dataService.getCategories();
  }

  ngAfterViewInit(): void {
    this.router.navigate(['main', { outlets: { mnavig: ['home'] }}], );  
  }

  ngAfterViewChecked(): void {
  }
}
