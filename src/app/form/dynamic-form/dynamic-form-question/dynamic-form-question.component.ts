import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../../shared/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic1-form-question.component.html',
  // templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  checkbox;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.form)
    // console.log(this.question);
    // console.log('DIlshad');
    // console.log(this.form.controls);
  }

  get isInvalid() {
    // console.log(this.question.key);
    return (
      this.form.controls[this.question.QuesId].invalid &&
      this.form.controls[this.question.QuesId].touched
    );
  }

  handleChange(evt) {
    // console.log(evt);
  }
}
