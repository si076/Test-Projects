import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CatObjectIntf } from '../CatObjectIntf';
import { DataService, MeasurementUnits } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private category: string = '';

  catObjects: CatObjectIntf[] = [];

  measurementUnits: MeasurementUnits = {duration: '', participantNumber: '', price: ''};

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.category = this.getCategoryFromRoute();

    if (!this.measurementUnits.duration) {
      this.loadMeasurementUnits();

      this.route.url.subscribe(() => {
        this.category = this.getCategoryFromRoute();
        this.loadCategoryObjects();
      });
    }
    
    this.loadCategoryObjects();
  }

  getCategoryFromRoute(): string {
    console.log(this.route.snapshot);
    let childrenPath = '';

    for (let index = this.route.snapshot.url.length - 1; index >= 0; index--) {
      
      if (this.route.snapshot.url[index].path === 'category') {
        break;
      }

      childrenPath = this.route.snapshot.url[index].path;
    }

    return childrenPath;
  }

  loadMeasurementUnits() {
    this.measurementUnits = this.dataService.getMeasurementUnits();
  }


  loadCategoryObjects() {
    this.catObjects = this.dataService.getCategoryObjects(this.category);
  }

}
