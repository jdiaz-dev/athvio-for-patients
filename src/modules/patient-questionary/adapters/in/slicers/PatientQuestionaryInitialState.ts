import {
  PatientQuestionaryBody,
  PatientQuestionaryInitialState,
  UpdateAnswersInput,
} from 'src/modules/patient-questionary/adapters/out/patient-questionary';

export const patientQuestionaryInitialState: PatientQuestionaryInitialState = {
  patientQuestionary: { data: {} as PatientQuestionaryBody, error: null },
};
