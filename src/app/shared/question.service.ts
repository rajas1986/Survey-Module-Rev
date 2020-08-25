import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DropdownQuestion } from './q-types/dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './q-types/textbox';
import { of, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MChoice } from './q-types/m-choice';
import { SChoice } from './q-types/s-choice';



let newheaders = { 
  'Content-Type':  'application/json', 
  'Authorization': 'Basic ' + btoa('P50002103:2w2w2w'),
  'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  'Pragma': 'no-cache',
  'Expires': '0'
}

const newHttpOptions  = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + btoa('P50002103:2w2w2w'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};



@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  constructor(private http: HttpClient) {}

  getBackendQ1(survey): any {
    return this.http
      .get<QuestionBase<string>[]>('http://localhost:3000/survey/quickPoll')
      .pipe(
        map((response: QuestionBase<string>[]) => {
          let questions: QuestionBase<string>[] = [];
          response.forEach((question) => {
            if (question.controlType == 'dropdown') {
              questions.push(new DropdownQuestion(question));
            }
            if (question.controlType == 'textbox') {
              questions.push(new TextboxQuestion(question));
            }
            if (question.controlType == 'sChoice') {
              questions.push(new SChoice(question));
            }
            if (question.controlType == 'mChoice') {
              questions.push(new MChoice(question));
            }
          });
          // console.log(questions);
          return questions.sort((a, b) => a.order - b.order);
        })
      );
  }

  getOdataForm(survey, lang):any {
    return this.http.get("/sap/opu/odata/sap/ZSURVEY_SRV/SurveyQuesHdrSet?$filter=(Uname eq '' and SurveyId eq '"+survey+"' and TemplateId eq '' and LangKey eq '"+lang+"')&$expand=SurveyQuesHdrToGrpNav,SurveyQuesHdrToListNav,SurveyQuesHdrToOptnNav",newHttpOptions);
  }

  postOdataForm(postData, csrfToken): any{
    newheaders['X-CSRF-Token'] = csrfToken;
    //console.log(newheaders);
    const httpOptions = new HttpHeaders(newheaders);
    console.log(postData);
    return this.http.post<any>('/sap/opu/odata/sap/ZSURVEY_SRV/SurveySubmitSet', postData, {headers: httpOptions});
  }
  // *Not working properly
  // getBackendQ(user) {
  //   // return this.http.get('http://localhost:3000/survey/' + user);

  //   let listOfQuestions: QuestionBase<string>[] = [];
  //   let subject = new Subject();
  //   let _listOfQuestions = new Subject<QuestionBase<any>[]>();
  //   this.http
  //     .get('http://localhost:3000/survey/' + user)
  //     .subscribe((response) => {
  //       subject.next(response);
  //     });
  //   subject.subscribe((response) => {
  //     // console.log(response);
  //     response.forEach((element) => {
  //       if (element.ctType == 'dropdown') {
  //         listOfQuestions.push(new DropdownQuestion(element));
  //         // console.log(this.listOfQuestions);
  //       }
  //       if (element.ctType == 'textbox') {
  //         listOfQuestions.push(new TextboxQuestion(element));
  //         // console.log(this.listOfQuestions);
  //       }
  //       if (element.ctType == 'sChoice') {
  //         listOfQuestions.push(new SChoice(element));
  //         // console.log(this.listOfQuestions);
  //       }
  //       if (element.ctType == 'mChoice') {
  //         listOfQuestions.push(new MChoice(element));
  //         // console.log(this.listOfQuestions);
  //         _listOfQuestions.next(listOfQuestions);
  //       }
  //     });
  //   });

  //   // return this.subject.asObservable();
  //   console.log(_listOfQuestions);
  //   return _listOfQuestions.asObservable();
  //   // return this.http.get('http://localhost:3000/survey/' + user);
  //   // console.log(this.listOfQuestions);
  //   // return this.listOfQuestions;
  // }
  getQuestions() {
    let questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'Dropdown Select',
        label: 'Dropdown Selection Example',
        options: [
          { key: 'amazing', value: 'Amazing' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'bad', value: 'Bad' },
          { key: 'Unsatisfactory', value: 'Unsatisfactory' },
        ],
        order: 2,
      }),

      new TextboxQuestion({
        key: 'textbox1 input',
        label: 'Text Box Question Example.',
        // value: 'Amazing',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'textbox2 input',
        label: 'Another Text Box Question Example',
        type: 'email',
        order: 3,
      }),
      new SChoice({
        key: 'Single Choice Questions',
        label: 'Single Selection Example',
        options: [
          { key: 'amazing', value: 'Amazing' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'bad', value: 'Bad' },
        ],
        order: 4,
      }),
      new MChoice({
        key: 'Multi Choice Question',
        label: 'Multiple Selection Example',
        options: [
          { key: 'reading', value: 'Reading' },
          { key: 'swimming', value: 'Swimming' },
          { key: 'surfing', value: 'Surfing' },
          { key: 'cooking', value: 'Cooking' },
          { key: 'travelling', value: 'Travelling' },
        ],
        order: 5,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
