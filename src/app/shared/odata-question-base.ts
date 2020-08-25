export class OdataQuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    ctType: string;
    type: string;
    QuesText: T;
    QuesId: string;
    QuesType: string;
    GroupId: string;
    LangKey: string;
    SurveyId: string;
    options: { key: string; value: string }[];
  
    constructor(
      options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        ctType?: string;
        type?: string;
        QuesText?: T;
        QuesId?: string;
        QuesType?: string;
        GroupId?: string;
        LangKey?: string;
        SurveyId?: string;
      } = {}
    ) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.ctType = options.ctType || '';
      this.type = options.type || '';
      this.QuesText = options.QuesText;
      this.QuesId = options.QuesId || '';
      this.QuesType = options.QuesType || '';
      this.LangKey = options.LangKey || '';
      this.SurveyId = options.SurveyId || '';
    }
  }
  