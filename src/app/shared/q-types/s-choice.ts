import { QuestionBase } from '../question-base';
export class SChoice extends QuestionBase<string> {
  controlType = 'sChoice';
  options: {
    key: string;
    value: string;
    ChoiceText: string;
    ChoiceValue: string;
  }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
