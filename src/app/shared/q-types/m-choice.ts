import { QuestionBase } from '../question-base';

export class MChoice extends QuestionBase<string> {
  controlType = 'mChoice';
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
