export type PatientQuestionaryDetail = {
  uuid: string;
  fieldName: string;
  associatedQuestion: string;
  answer: string;
  // fieldOptions?: string | string[];
};

export type PatientQuestionaryGroup = {
  uuid: string;
  title: string;
  description?: string;
  questionaryDetails: PatientQuestionaryDetail[];
};

export type PatientQuestionaryBody = {
  uuid: string;
  professional: string;
  patient: string;
  questionaryGroups: PatientQuestionaryGroup[];
};

export type GetPatientQuestionaryBody = {
  patientQuestionary: string;
  patient: string;
};

export type GetPatientQuestionaryRequest = {
  input: GetPatientQuestionaryBody;
};

export type GetPatientQuestionaryResponse = {
  getPatientQuestionary: PatientQuestionaryBody;
};
