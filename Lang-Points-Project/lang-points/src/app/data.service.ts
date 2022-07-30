import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OnLangsChange } from './OnLangsChange';
import { Characteristics, LangSettings, Language, Noun, ObjectWrapper } from './TransfferedObjectsClasses';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:5000';

  fromLang: Language = new Language();
  toLang: Language[] = [];
  siteLang: Language = new Language('en');

  private avaiableLanguages: Language[] = [];

  private langsSettings: LangSettings[] = [];

  private callbacksOnLangsChange: OnLangsChange[] = [];

  private characteristics:Characteristics | null = null;

  constructor(private http: HttpClient) { }

  setLangs(fromLang: string, toLang: string) {
    this.fromLang = this.avaiableLanguages.find(el => el.lang === fromLang)!;
    if (toLang === '*') {
      this.toLang = this.avaiableLanguages.filter(el => el.lang !== fromLang &&
                                                        el.lang !== '*');
    }
    else {
      this.toLang = [this.avaiableLanguages.find(el => el.lang === toLang)!];
      this.siteLang = this.toLang[0];
    }

    this.executeOnLangsChange();
  }

  executeOnLangsChange() {
    this.callbacksOnLangsChange.forEach(el => el.OnLangsChange());
  }

  getFromLang(): Language {
    return this.fromLang;
  }

  getToLang(): Language[] {
    return this.toLang;
  }

  getSiteLang(): Language {
    return this.siteLang;
  }

  registerOnLangsChange(callback: OnLangsChange) {
    this.callbacksOnLangsChange.push(callback);
  }

  getAvailableLanguages(): Promise<Language[]> {
    return new Promise((resolve, reject) => {
      const url = `${this.url}/languages`;

      if (this.avaiableLanguages.length === 0) {

        this.http.get<ObjectWrapper<Language[]>>(url).subscribe(
          
          (result:ObjectWrapper<Language[]>) => {
            console.log(result);
            if (result.objectOfInterest) {
              this.avaiableLanguages = result.objectOfInterest;

              resolve(this.avaiableLanguages);
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {}
        );
      } else {
        resolve(this.avaiableLanguages);
      }

    });
    
  }

  getAvailableLanguagesSync(): Language[] {
    return this.avaiableLanguages;
  }

  getLangSettings(lang: string): Promise<LangSettings[]> {
    return new Promise<LangSettings[]>((resolve, reject) => {

      let langSettingsTmp = null;
      if (lang !== '*') {
        langSettingsTmp = this.langsSettings.find(el => el.lang === lang);
      }

      if (!langSettingsTmp) {
        const url = `${this.url}/${lang}/lang_settings`;

        this.http.get<ObjectWrapper<LangSettings[]>>(url).subscribe(
          
          (result:ObjectWrapper<LangSettings[]>) => {
            console.log(result);
            if (result.objectOfInterest) {

              if (lang !== '*') {
                this.langsSettings = this.langsSettings.concat(result.objectOfInterest);
              }
              else {
                this.langsSettings = result.objectOfInterest;
              }

              resolve(result.objectOfInterest);
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {}
        );
      } else {
        resolve([langSettingsTmp]);
      }

    });
  }

  getLangSettingsSync(lang: string): LangSettings | undefined {
    return this.langsSettings.find(el => el.lang === lang);
  }

  getCharacteristics(lang: string): Promise<Characteristics> {
    return new Promise<Characteristics>((resolve, reject) => {

      if (!this.characteristics) {
        const url = `${this.url}/${lang}/characteristics`;

        this.http.get<Characteristics>(url).subscribe(
          (result) => {
            console.log(result);
            this.characteristics = result;

            if (this.characteristics) {
              resolve(this.characteristics);
            } else {
              reject(result);
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {}
        );
      } else {
        resolve(this.characteristics);
      }

    });
  }

  getCharacteristicsSync() {
    return this.characteristics;
  }

  getNounsURL(): string {
    const toLang = this.toLang.length > 1 ? '*': this.toLang.length === 1 ? this.toLang[0].lang: 'en'; 
    return `${this.url}/${this.fromLang.lang}/${toLang}/nouns`;
  }

  getNouns(): Promise<Noun[]> {
    return new Promise((resolve, reject) => {
    console.log('getNouns -> ' + this.getNounsURL());

    this.http.get<ObjectWrapper<Noun[]>>(this.getNounsURL()).subscribe(
        (data:ObjectWrapper<Noun[]> ) => {
          
          console.log(data);

          resolve(data.objectOfInterest!);
        },
        (error) => {
          reject(error);
        },
        () => {}
      ); 
    });
  }

  saveNouns(nouns: Noun[]) {
    nouns.forEach(el => {
      this.saveNoun(el)
    });
  }

  saveNoun(noun: Noun): Observable<Noun> {
    return this.http.post<Noun>(this.getNounsURL() , noun); //, httpOptions);
  }
}
