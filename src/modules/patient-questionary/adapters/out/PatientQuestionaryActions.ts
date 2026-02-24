import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import * as PatientPlansSlice from 'src/modules/patient-plans/adapters/in/slicers/PatientPlanSlice';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import {
  GetPatientPlansRequest,
  GetPatientPlansResponse,
  GetRecordsPatientPlansBody,
} from 'src/modules/patient-plans/adapters/out/patient-plan';
import { GET_QUESTIONARY_FOR_PATIENT } from 'src/modules/patient-questionary/adapters/out/patientQuestionary';

export function usePatientQuestionary() {
  const dispatch = useDispatch();

  const getQuestionaryForPatient = async (body: GetRecordsPatientPlansBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetPatientPlansResponse, GetPatientPlansRequest>({
        mutation: GET_QUESTIONARY_FOR_PATIENT,
        variables: {
          patientPlans: { ...body },
        },
      });
      if (response.data) dispatch(PatientPlansSlice.initializePatientPlans(response.data.getPatientPlansForMobile));
    } catch (error) {
      dispatch(PatientPlansSlice.initializePatientPlansError((error as ApolloError).graphQLErrors[0].message));
    }
  };

  return { getQuestionaryForPatient };
}
