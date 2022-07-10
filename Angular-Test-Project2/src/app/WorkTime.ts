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

export class WorkingDaysPattern {
    
    constructor(public pattern: WorkingDay[] = []) {}

    public toString(): string {
        let wd: number = 0, df: number = 0;
        let patternString = '';
        for (let i = 0; i < this.pattern.length; i++) {
            const day = this.pattern[i];
            
            if (day instanceof DayOff) {
                if (df === 0 && wd !== 0) {
                    patternString += `${wd}-работни дни `;

                    wd = 0;
                }
                df++;
            } else {
                if (df !== 0 && wd === 0) {
                    patternString += `${df}-почивни дни `;

                    df = 0;
                }
                wd++;

            }
        }
        if (wd > 0) {
            patternString += `${wd}-работни дни `;
        } else if (df > 0) {
            patternString += `${df}-почивни дни `;
        }

        return patternString;
    }
}

export class WorkTime {
    workOnDayOffs: boolean = false;
    workOnOfficialHolidays: boolean = false;
    workingPattern: WorkingDaysPattern | null = null;
    workingPatternSartsOnDay: DAY_OF_WEEK = DAY_OF_WEEK.UNDEFINED;
    workingPatternStartsOnDate: Date = new Date();
}