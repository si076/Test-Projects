enum DAY_OF_WEEK {
    UNDEFINED = 0,
    MONDAY    = 1,
    TUESDAY   = 2,
    WEDNESDAY = 3,
    THURSDAY  = 4,
    FRIDAY    = 5,
    SATERDAY  = 6,
    SUNDAY    = 7,
}

enum Measurements {
    UNDEFINED = 0,
    DAYS      = 1,
    HOURS     = 2,
    MINUTES   = 3,
}

export class Period {
    start: number = 0;
    duration: number = 0;
    times: number = 0;
    repeatAfter: number = 0;
    measurement: number = Measurements.UNDEFINED; 
}

export class WorkingDay {
    workPeriods: Period[] = [];
    breakPreriods: Period[] = [];
}

export class DayOff extends WorkingDay {

}

export class Vacation {
    periods: Period[] = [];
}

export class WorkTime {
    workOnDayOffs: boolean = false;
    workOnOfficialHolidays: boolean = false;
    workingPattern: WorkingDay[] = [];
    workingPatternSartsOnDay: DAY_OF_WEEK = DAY_OF_WEEK.UNDEFINED;
    workingPatternStartsOnDate: Date = new Date();
}