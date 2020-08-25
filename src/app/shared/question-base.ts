export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;

  // *This is for odata format
  GroupId: string;
  QuesId: string;
  QuesText: string;
  QuesType: string;
  SurveyId: string;
  TemplateId: string;
  Uname: string;
  LangKey: string;
  Layout: string;

  options: {
    key: string;
    value: string;
    ChoiceText: string;
    ChoiceValue: string;
  }[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      GroupId?: string;
      QuesId?: string;
      QuesText?: string;
      QuesType?: string;
      SurveyId?: string;
      TemplateId?: string;
      Uname?: string;
      LangKey?: string;
      Layout?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.GroupId = options.GroupId;
    this.QuesId = options.QuesId;
    this.QuesText = options.QuesText;
    this.QuesText = options.QuesText;
    this.SurveyId = options.SurveyId;
    this.TemplateId = options.TemplateId;
    this.Uname = options.Uname;
    this.LangKey = options.LangKey;
    this.Layout = options.Layout;
  }
}
