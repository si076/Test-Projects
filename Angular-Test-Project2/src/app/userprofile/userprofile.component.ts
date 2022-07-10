import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  workingDaysPatterns:WorkingDaysPattern[] = [];

  workingDayPattern: WorkingDaysPattern | null = null;

  CalendarView = CalendarView;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  viewDate: Date = new Date();
  
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
}
