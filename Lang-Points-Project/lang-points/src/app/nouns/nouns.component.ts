import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Noun } from './noun/noun';

@Component({
  selector: 'app-nouns',
  templateUrl: './nouns.component.html',
  styleUrls: ['./nouns.component.css']
})
export class NounsComponent implements OnInit {

  nouns: Noun[] = [];

  currentNoun: Noun = new Noun();

  dialogInlineStyle = {display:'none'};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getNouns().subscribe((data:any ) => {

      console.log(data);

      this.nouns = data;
    });
  }

  onAddNoun() {
    this.currentNoun = new Noun();
    // this.currentNoun.singularFullForm = 'Test2';
    this.dialogInlineStyle = {display:'block'};
  }  

  onCloseDialog() {
    console.log('Noun->');
    console.log(this.currentNoun);
    
    this.dialogInlineStyle = {display:'none'};
  }

  onSaveDialog() {
    const nounsToSave = [this.currentNoun];

    this.dataService.saveNouns(nounsToSave).subscribe((data: any) => {

      console.log('Save nouns response->');
      console.log(data);


    });
  } 

}
