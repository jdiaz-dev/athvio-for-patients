import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import * as PatientPlansSlice from 'src/modules/patient-plans/adapters/in/slicers/PatientPlanSlice';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { PATIENT_PLAN_FOR_MOBILE } from 'src/modules/patient-plans/adapters/out/patientPlansQueries';
import {
  GetPatientPlansRequest,
  GetPatientPlansResponse,
  GetRecordsPatientPlansBody,
} from 'src/modules/patient-plans/adapters/out/patient-plan';

export function usePatientPlans() {
  const dispatch = useDispatch();

  const getPatientPlans = async (body: GetRecordsPatientPlansBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetPatientPlansResponse, GetPatientPlansRequest>({
        mutation: PATIENT_PLAN_FOR_MOBILE,
        variables: {
          patientPlans: { ...body },
        },
      });
      if (response.data) dispatch(PatientPlansSlice.initializePatientPlans(response.data.getPatientPlansForMobile));
    } catch (error) {
      dispatch(PatientPlansSlice.initializePatientPlansError((error as ApolloError).graphQLErrors[0].message));
    }
  };

  return { getPatientPlans };
}
