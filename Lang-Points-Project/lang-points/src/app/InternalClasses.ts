import { DataService } from "./data.service";
import { Language } from "./TransfferedObjectsClasses";
import { UtilsService } from "./utils.service";

export class TranslObjInt {
    lang: Language = new Language(); 
    translationsAsString: string = '';
    compOrederStyle: string = '';
    labelDirectStyle: string = '';
    inputDirectStyle: string = ''

    static createTranslObjInt(lang: string, 
                              tetranslation: string,
                              dataService: DataService,
                              utilsService: UtilsService): TranslObjInt {
      const obj: TranslObjInt = new TranslObjInt();
      const langObj: Language = 
              dataService.getAvailableLanguagesSync().find(avEl => avEl.lang === lang)!;

            obj.lang = langObj; 
            obj.translationsAsString = tetranslation;
            obj.compOrederStyle = utilsService.getFlowStyle(lang);
            obj.labelDirectStyle = utilsService.getDirectionStyle(dataService.getSiteLang().lang);
            obj.inputDirectStyle = utilsService.getDirectionStyle(lang);

      return obj;
    }
  
  }
  