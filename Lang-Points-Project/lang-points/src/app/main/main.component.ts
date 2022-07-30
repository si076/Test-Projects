import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchValue:string = '';

  constructor(private dataService: DataService,
              private utilsService: UtilsService) { }

  ngOnInit(): void {

    this.utilsService.openLoadingBox();

    this.dataService.getLangSettings('*')
    .then((langSettResults) => {
      console.log('getLangSettings then');

      return this.dataService.getCharacteristics(this.dataService.getFromLang().lang);
    })
    .then((characResults) => {
      console.log('getCharacteristics then');

      this.utilsService.closeLoadingBox();
    })
    .catch((error) => {
      console.log(error);
    })

  }

}
