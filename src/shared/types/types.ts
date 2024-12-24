import { ChatInitialState } from 'src/modules/chat/adapters/out/chat';
import { PatientPlanInitialState } from 'src/modules/patient-plans/adapters/out/patient-plan';

export type ReduxStates = {
  chat: ChatInitialState;
  patientPlans: PatientPlanInitialState;
};

export type RootStackParamList = {
  SignIn: undefined;
  Navigation: { tabTitle: string };
};