import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fromLang: string = '';
  toLang: string = '';

  constructor(private dataService: DataService,
              private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  onGoClicked() {
    this.dataService.setLangs(this.fromLang, this.toLang);
    this.utilsService.setLangs(this.fromLang, this.toLang);
  }
}
