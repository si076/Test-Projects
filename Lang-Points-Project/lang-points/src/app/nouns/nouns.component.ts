import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Noun, ObjectWrapper } from '../TransfferedObjectsClasses';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-nouns',
  templateUrl: './nouns.component.html',
  styleUrls: ['./nouns.component.css']
})
export class NounsComponent implements OnInit {

  nouns: Noun[] = [];

  currentNoun: Noun = new Noun();

  dialogInlineStyle = {display:'none'};

  constructor(private dataService: DataService,
              private utilsService: UtilsService) { }

  ngOnInit(): void {

    this.utilsService.openLoadingBox();

    this.dataService.getNouns()
    .then((results) => {

      this.nouns = results;

      this.utilsService.closeLoadingBox();
      
    })
    .catch((error) => {

      this.utilsService.closeLoadingBox();

    });

  }

  onAddNoun() {
    this.currentNoun = new Noun();

    this.dialogInlineStyle = {display:'block'};
  }  

  onCloseDialog() {
    console.log('Noun->');
    console.log(this.currentNoun);
    
    this.dialogInlineStyle = {display:'none'};
  }

  onSaveDialog() {
    const nounsToSave = [this.currentNoun];

    // this.dataService.saveNouns(nounsToSave).subscribe(
    //   (data: any) => {

    //   console.log('Save nouns response->');
    //   console.log(data);


    //   },
    //   (error) => {

    //   }
    // );
  } 

}
