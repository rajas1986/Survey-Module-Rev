import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    'Pragma': 'no-cache',
    'Authorization': 'Basic ' + btoa('P50002103:2w2w2w'),
    'Expires': '0'
  })
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private _urlSurveyList: string = "/sap/opu/odata/sap/ZSURVEY_SRV/PendSurveyHdrSet?$expand=SurveyHdrToItemNav/SurveyItemToLangNav";

  constructor(private http: HttpClient) {}
  SurveyName: string = '';
  SurveyDesc: string = '';
  SurveyLang: string = '';
  getSurveyLang(){
    return this.SurveyLang;
  }
  updateSurveyLang(lang: string){
    this.SurveyLang = lang;
  }
  updateSurveyName(name: string) {
    //console.log(name);
    this.SurveyName = name;
    //console.log(this.SurveyName);
  }
  getSurveyName() {
    //console.log(this.SurveyName);
    return this.SurveyName;
  }
  updateSurveyDesc(desc: string) {
    this.SurveyDesc = desc;
  }
  getSurveyDesc() {
    return this.SurveyDesc;
  }
  getSurveyList() {
    //return this.http.get('http://localhost:3000/table');
    return this.http.get<any>(this._urlSurveyList,httpOptions);
  }
  getOdataTable() {
    return this.http.get('http://localhost:3000/odataTable');
  }
}
