import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import * as PatientProgramsSlice from 'src/modules/patient-programs/adapters/in/slicers/PatientProgramsSlice';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import {
  GetPatientProgramsBody,
  GetPatientProgramsRequest,
  GetPatientProgramsResponse,
} from 'src/modules/patient-programs/adapters/out/patient-program';
import { GET_MASTER_PROGRAMS } from 'src/modules/patient-programs/adapters/out/PatientProgramsQueries';

export function usePatientPrograms() {
  const dispatch = useDispatch();

  const getPatientPrograms = async (body: GetPatientProgramsBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetPatientProgramsResponse, GetPatientProgramsRequest>({
        mutation: GET_MASTER_PROGRAMS,
        variables: {
          input: { ...body },
        },
      });
      if (response.data) {
        dispatch(PatientProgramsSlice.initializePatientPrograms(response.data.getMasterPrograms.data));
      }
    } catch (error) {
      dispatch(PatientProgramsSlice.initializePatientProgramsError((error as ApolloError).graphQLErrors[0].message));
    }
  };

  return { getPatientPrograms };
}
