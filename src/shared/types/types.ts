import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatInitialState } from 'src/modules/chat/adapters/out/chat';
import { PatientPlanInitialState } from 'src/modules/patient-plans/adapters/out/patient-plan';

export type ReduxStates = {
  chat: ChatInitialState;
  patientPlans: PatientPlanInitialState;
};

export type ScreenParamList = {
  SignIn: undefined;
  Navigation: { tabTitle: string };
};
export type SignInScreenNavigationProp = NativeStackNavigationProp<ScreenParamList, 'SignIn'>;
export type NavigationScreenNavigationProp = NativeStackNavigationProp<ScreenParamList, 'Navigation'>;
