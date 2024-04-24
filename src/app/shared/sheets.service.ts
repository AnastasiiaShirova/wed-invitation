import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonInfo} from "../interfaces/person-info.interface";

const SHEET_URL = 'https://sheetdb.io/api/v1/321xl6u6yzrmb';
@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(private http: HttpClient) { }

  getSheet(): Observable<any> {
    return this.http.get<any>(SHEET_URL);
  }

  addPerson(personInfo: PersonInfo): Observable<any> {
    return this.http.post<any>(SHEET_URL, {
      data: [
        {
          'ИМЯ': personInfo.name,
          'ФАМИЛИЯ': personInfo.secondName,
          'ТРАНСФЕР': personInfo.transfer,
          'ЕДА': personInfo.food,
          'АЛКОГОЛЬ': personInfo.alcohol,
          'ДЕТИ': personInfo.child,
        }
      ]
    });
  }
}

