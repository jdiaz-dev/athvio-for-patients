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
  professional: string;
};

export type GetPatientQuestionaryRequest = {
  input: GetPatientQuestionaryBody;
};

export type GetPatientQuestionaryResponse = {
  getQuestionaryForPatient: PatientQuestionaryBody;
};

export type PatientQuestionaryAnswersInput = {
  questionaryDetail: string;
  answer: string;
};

type PatientQuestionaryGroupWithAnswersInput = {
  questionaryGroup: string;
  questionaryDetails: PatientQuestionaryAnswersInput[];
};

export type UpdateAnswersInput = {
  professional: string;
  patient: string;
  questionary: string;
  questionaryGroups: PatientQuestionaryGroupWithAnswersInput[];
};

export type PatientQuestionaryInitialState = {
  patientQuestionary: { data: PatientQuestionaryBody; error: string | null };
  patientQuestionaryAnswers: { data: UpdateAnswersInput; error: string | null };
};
