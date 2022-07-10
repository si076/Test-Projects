import { Injectable } from '@angular/core';
import { CatObject } from './CatObject';
import { CatObjectIntf } from './CatObjectIntf';
import { UserProfile } from './UserProfile';
import { UserRights } from './UserRights';
import { DayOff, WorkingDay, WorkingDaysPattern } from './WorkTime';

// export type Category = {category: string, translations: Map<string, string>};
export type Category = {category: string, translation: string};
export type MeasurementUnits = {duration: string, participantNumber: string, price: string};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  static locale:string = 'bg';

  constructor() { };

  getCategories(): Category[] {
    //For testing purpose 

    // const medTranMap = new Map<string, string>();
    // medTranMap.set('bg', 'Медиации');
    // medTranMap.set('en','Mediations');
    const mediations = {category:'mediations', translation: 'Медиации'};

    // const consTranMap = new Map<string, string>();
    // consTranMap.set('bg', 'Консултации');
    // consTranMap.set('en','Consultations');
    const consultations = {category:'consultations', translation: 'Консултации'};

    // const trainTranMap = new Map<string, string>();
    // trainTranMap.set('bg', 'Обучения');
    // trainTranMap.set('en','Trainings');
    const trainings = {category:'trainings', translation: 'Обучения'};

    return [
            mediations,
            consultations,
            trainings
            ];
  };

  getCategoryObjects(category:string): CatObjectIntf[] {
    //For testing purpose

    const catObjects: CatObjectIntf[] = [];

    switch (category) {
      case 'mediations':
        
        const obj1 = new CatObject('mediations', 'Медиация 1', 'Тази медиация се опитва да ...', 40, 
                                   ['онлайн', 'офис'], 
                                   [{minParticipants: 2, maxParticipants: 2, price: 20}], 
                                   true, 
                                   {r: 200, g: 100, b: 100, a: 1.0});
        const obj2 = new CatObject('mediations', 'Медиация 2', 'Тази медиация се опитва да ...', 40, 
                                   ['онлайн', 'офис'], 
                                   [{minParticipants: 2, maxParticipants: 10, price: 20},
                                    {minParticipants: 10, maxParticipants: 20, price: 60}], 
                                   true, 
                                   {r: 200, g: 100, b: 100, a: 1.0});

        catObjects.push(obj1);
        catObjects.push(obj2);

        break;
      
      case 'consultations':

        const obj3 = new CatObject('consultations', 'Консултация 1', 'Консултация по тема ...', 40, 
                                   ['онлайн', 'офис'], 
                                   [{minParticipants: 1, maxParticipants: 1, price: 20}], 
                                   true, 
                                   {r: 100, g: 200, b: 100, a: 1.0});
        const obj4 = new CatObject('consultations', 'Консултация 2', 'Консултация по тема ...', 40, 
                                   ['онлайн', 'офис'], 
                                   [{minParticipants: 1, maxParticipants: 1, price: 30}], 
                                   true, 
                                   {r: 100, g: 200, b: 100, a: 1.0});

        catObjects.push(obj3);
        catObjects.push(obj4);

        break;

      case 'trainings':
        const obj5 = new CatObject('trainings', 'Обучение 1', 'Обучение на тема ...', 40, 
                                   ['онлайн', 'офис', 'удобно за вас място'], 
                                   [{minParticipants: 10, maxParticipants: 40, price: 20}], 
                                   true, 
                                   {r: 100, g: 100, b: 200, a: 1.0});
        const obj6 = new CatObject('trainings', 'Обучение 2', 'Обучение на тема ...', 40, 
                                   ['онлайн', 'офис', 'удобно за вас място'], 
                                   [{minParticipants: 10, maxParticipants: 30, price: 20}], 
                                   true, 
                                   {r: 100, g: 100, b: 200, a: 1.0});

        catObjects.push(obj5);
        catObjects.push(obj6);

        break;

      default:
        break;
    }

    return catObjects;
  }

  getMeasurementUnits(): MeasurementUnits {
    //just for testing
    return {duration: 'минути', participantNumber: 'участници', price: 'лв.'};
  }

  getUserRights(): UserRights {
    return new UserRights(1, 1);
  }

  getUserProfile(): UserProfile {
    return new UserProfile('userId');
  }

  getWorkingDaysPatterns(): WorkingDaysPattern[] {

    const workingDaysPattern1 = new WorkingDaysPattern([
      new WorkingDay(), 
      new WorkingDay(),
      new WorkingDay(),
      new WorkingDay(),
      new WorkingDay(),
      new DayOff(),
      new DayOff()]);
    return [workingDaysPattern1];
  }
}
