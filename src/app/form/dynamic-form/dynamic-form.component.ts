import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';
import { QuestionService } from '../../shared/question.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { MChoice } from '../../shared/q-types/m-choice';
import { SChoice } from '../../shared/q-types/s-choice';
import { DropdownQuestion } from '../../shared/q-types/dropdown';
import { TextboxQuestion } from '../../shared/q-types/textbox';

import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService } from 'src/app/shared/backend.service';

export interface odataQueFormat {
  GroupId: string;
  LangKey: string;
  Layout: string;
  QuesId: string;
  QuesText: string;
  QuesType: string;
  SurveyId: string;
  TemplateId: string;
  Uname: string;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic1-form.component.html',
  // templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService, QuestionService],
})
export class DynamicFormComponent implements OnInit {
  // @Input() questions: QuestionBase<string>[] = [];
  public loading = false;
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  payLoad = '';
  csrfToken = '';
  // *dealign with odataform
  odataPayload: string[];
  odataQuestions = [];
  totalQuestions;
  odataFormQuestions = [];
  odataForm: FormGroup;
  showLoading: boolean = true;
  surveyId = '';
  surveyDesc = '';
  surveyLang = '';

  constructor(
    private qcs: QuestionControlService,
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationsService,
    private spinner: NgxSpinnerService,
    private tableService: BackendService
  ) {}

  ngOnInit() {
    var name = this.route.snapshot.params.name;
    this.surveyId = name;
    
    this.surveyDesc = this.tableService.getSurveyDesc();
    this.surveyLang = this.tableService.getSurveyLang();

    if(this.surveyDesc!=""){
      localStorage.setItem("surveyDesc", this.surveyDesc);
      localStorage.getItem("surveyDesc");
    } else {
      this.surveyDesc = localStorage.getItem("surveyDesc");
    }

    if(this.surveyLang!=""){
      localStorage.setItem("surveyLang", this.surveyLang);
      localStorage.getItem("surveyLang");
    } else {
      this.surveyLang = localStorage.getItem("surveyLang");
    }

    this.service.getBackendQ1(name).subscribe((data) => {
      // console.log(data);
      this.questions = data;
      // console.log(this.questions);
    });

    // *Dealing with odatafrom
    // *Mapping the questions
    this.service.getOdataForm(name, this.surveyLang).subscribe(
      (response) => {
        //console.log(response.body.d.results);
        this.csrfToken = response.headers.get('X-CSRF-Token');
        response.body.d.results[0]['SurveyQuesHdrToListNav']['results'].forEach(
          (question, index, array) => {
            this.odataQuestions[index] = question;
            if (index == 0) {
              this.totalQuestions = array.length;
              //console.log(this.totalQuestions);
            }
          }
        );
        //console.log(this.odataQuestions); //* The questions are mapped here.
        // *Pushing the options into the questions
        for (var i = 0; i < this.totalQuestions; i++) {
          this.odataQuestions[i]['options'] = response.body.d.results[0][
            'SurveyQuesHdrToOptnNav'
          ]['results']
            .filter((question) => {
              if (question.QuesId == i + 1) {
                return question;
              }
            })
            .map((question) => {
              return question;
            });
        }
        //console.log(this.odataQuestions);
        this.odataQuestions.forEach((question) => {
          if (question.QuesType == 'M') {
            // console.log(question);
            this.odataFormQuestions.push(new MChoice(question));
          }
          if (question.QuesType == 'S') {
            // console.log(question);
            this.odataFormQuestions.push(new SChoice(question));
          }
          if (question.QuesType == 'L') {
            // console.log(question);
            this.odataFormQuestions.push(new DropdownQuestion(question));
          }
          if (question.QuesType == 'T') {
            // console.log(question);
            this.odataFormQuestions.push(new TextboxQuestion(question));
          }
        });
        //console.log(this.odataFormQuestions);

        this.odataForm = this.qcs.toFormGroup1(this.odataFormQuestions);
        //console.log(this.odataForm);
        this.showLoading = false;
      },
      (error) => {
        //console.log(error);
        this.notificationService.config.duration = 10000;
        this.notificationService.success(`${error.url} : Not found`);
      }
    );

    // console.log('DIlshad');
    // console.log(this.questions);
    // console.log(this.form);
  }
  // *This for normal form
  resetForm() {
    this.form.reset();
    // console.log(this.form);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    //console.log(this.form);
    console.log("hii111");
    console.log(this.form.getRawValue());
    this.openDialog();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.minWidth = 'fit-content';
    const dialogRef = this.dialog.open(LoadingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      result === 1
        ? this.postData()
        : this.notificationService.success('Form not submitted');
    });
    // console.log(this.dialog);
  }
  postData() {
    this.spinner.show();
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(4));
    takeFourNumbers.subscribe((x) => {
      // console.log('Next', x);
      if (x == 3) {
        this.spinner.hide();
        this.notificationService.success(':: Submitted Successfully');
        this.router.navigateByUrl('/');
      }
    });
  }

  // * Working with odataForm
  resetForm1() {
    this.odataForm.reset();
    // console.log(this.odataForm);
  }

  onSubmit1() {
    this.odataPayload = this.odataForm.getRawValue();
    //console.log(this.odataForm);
    //console.log("hii222");
    //console.log(this.odataForm.getRawValue());
    this.openDialog1();
  }
  openDialog1() {
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.minWidth = 'fit-content';
    const dialogRef = this.dialog.open(LoadingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      result === 1
        ? this.postData1()
        : this.notificationService.success('Form not submitted');
    });
    // console.log(this.dialog);
  }
  postData1() {
    this.spinner.show();
    let finalPostData = {};
    finalPostData["SurveyId"] = this.surveyId;
    for (let [key, value] of Object.entries(this.odataPayload)) {
      var currkey = Number(key).toString();
      //console.log(this.isStringArray(value));
      finalPostData["A"+currkey] = this.isStringArray(value);
    }
    //console.log(finalPostData);
    this.service.postOdataForm(JSON.stringify(finalPostData), this.csrfToken).subscribe(
      (data) => { 
        if (Object.keys(data.d).length === 0) {
          console.log("Error while submitting data");
        } else {
          console.log(data);
          this.spinner.hide();
          this.notificationService.success(':: Submitted Successfully');
          this.router.navigateByUrl('/');
        }
        
      }
    );
    /*const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(4));
    takeFourNumbers.subscribe((x) => {
      // console.log('Next', x);
      if (x == 3) {
        this.spinner.hide();
        this.notificationService.success(':: Submitted Successfully');
        this.router.navigateByUrl('/table');
      }
    });*/
  }
  isStringArray(value: any){
    if (value instanceof Array) {
      let str: string = value.join(",");
      return str;
      /*value.forEach(function(item) { // maybe only check first value?
        if (typeof item !== 'string') {
          console.log(item);
          return false
        }
      })*/
    } else {
      return value;
    }
  }

}
