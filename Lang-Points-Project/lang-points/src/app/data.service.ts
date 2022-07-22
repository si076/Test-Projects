import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Noun } from './nouns/noun/noun';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:5000';

  fromLang: string = '';
  toLang: string = '';

  constructor(private http: HttpClient) { }

  setLangs(fromLang: string, toLang: string) {
    this.fromLang = fromLang;
    this.toLang = toLang;
  }

  getFromLang(): string {
    return this.fromLang;
  }

  getToLang(): string {
    return this.toLang;
  }


  getNouns(): Observable<Noun[]> {
    const nounsURL = this.url + '/nouns';

    console.log(`from lang: ${this.fromLang} -> to lang: ${this.toLang}`);

    return this.http.get<Noun[]>(nounsURL);
  }

  saveNouns(nouns: Noun[]): Observable<Noun[]> {
    const nounsURL = this.url + '/nouns';
    // const httpOptions = {
    //   'Content-Type':  'application/json'
    // };

    return this.http.post<Noun[]>(nounsURL, nouns); //, httpOptions);
  }
}
