import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { DayOff, WorkingDay, WorkingDaysPattern } from '../WorkTime';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarDateFormatter
} from 'angular-calendar';
import { CustomDateFormatter } from '../home/custom-date-formatter.provider';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]

})
export class UserprofileComponent implements OnInit, OnChanges {

  workingDaysPatterns:WorkingDaysPattern[] = [];

  workingDayPattern: WorkingDaysPattern | null = null;

  locale: string = 'bg';
  CalendarView = CalendarView;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  viewDate: Date = new Date();

  userFirstName:string = '';
  userLastName:string = '';
  fullName: string = '';
  
  photo_url: string = '';
  photoBase64Encoded: string = '';

  shortSelfPresentation:string = '';
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.workingDaysPatterns = this.dataService.getWorkingDaysPatterns();
    if (this.workingDaysPatterns.length > 0) {
      this.workingDayPattern = this.workingDaysPatterns[0];
    }
  }

  isDayOff(day: WorkingDay): boolean {
    return day instanceof DayOff;
  }

  onWorkingDaysPatternChange(event:any) {
    console.log(event);
    // const index = event.target.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    // if ((changes. && !changes..firstChange) ||
    //     (changes. && !changes..firstChange)) {
    // }    
  }

  onUserNameChange() {
    this.fullName = this.userFirstName + ' ' + this.userLastName;
  }

  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input !== null && input.files) {
      const reader = new FileReader();
      reader.readAsDataURL( input.files[0] );
      
      reader.onloadend = (event:ProgressEvent) => {
        const fileReader = event.target as FileReader;
        this.photo_url = fileReader.result as string;
        this.photoBase64Encoded = this.photo_url;
      }
    }
  }
}
