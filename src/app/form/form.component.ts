import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionService } from '../shared/question.service';
import { QuestionBase } from '../shared/question-base';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [QuestionService],
})
export class FormComponent implements OnInit {
  surveyName: string = '';
  surveyDesc: string = '';

  dataReceived: boolean = false;
  // questions$: Observable<QuestionBase<any>[]>;
  questions$: Observable<QuestionBase<any>[]>;
  questions1$: Observable<QuestionBase<any>[]>;

  constructor(
    public service: QuestionService,
    private route: ActivatedRoute,
    private tableService: BackendService
  ) {
    // this.questions$ = service.getQuestions();
    // service.getQuestions().subscribe((response) => {
    //   console.log(response);
    // });
    // var name = this.route.snapshot.params.name;
    // console.log(service.getBackendQ1(name));
  }

  // service.getQuestions().subscribe((response) => {
  //   console.log(response);
  // });
  // console.log(service.getQuestions());
  // *Not working properly
  // var name = this.route.snapshot.params.name;
  // service.getBackendQ(name).subscribe((response) => {
  //   console.log(response);
  // });
  // this.questions$ = service.getBackendQ(name);
  // console.log(this.questions$);
  // console.log(this.questions$);

  ngOnInit(): void {
    //console.log(this.tableService);
    this.surveyName = this.tableService.getSurveyName();
    if(this.surveyName!=""){
      localStorage.setItem("surveyName", this.surveyName);
      localStorage.getItem("surveyName");
    } else {
      this.surveyName = localStorage.getItem("surveyName");
    }

    this.surveyDesc = this.tableService.getSurveyDesc();
    //console.log(this.surveyName);

    var name = this.route.snapshot.params.name;
    // console.log(this.service.getBackendQ1(name));
    // this.questions$ = this.service.getBackendQ1(name);
    // this.questions$.subscribe((data) => {
    //   console.log(data);
    // });
    //console.log(name);
    this.questions$ = this.service.getBackendQ1(name);
    this.service.getBackendQ1(name).subscribe((data) => {
      //console.log(data);
      this.dataReceived = true;
    });
  }
  // var name = this.route.snapshot.params.name;
  // this.questions$ = this.service.getBackendQ(name);
  // console.log(this.questions$);
}
