import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { GetPatientInput, GetPatientRequest, GetPatientResponse } from 'src/modules/account/out/patient';
import { GET_PATIENT } from 'src/modules/account/out/patientQueries';

export function usePatient() {
  const getPatient = async (input: GetPatientInput): Promise<FetchResult<GetPatientResponse>> => {
    const res = await apolloClient.query<GetPatientResponse, GetPatientRequest>({
      query: GET_PATIENT,
      variables: {
        input,
      },
    });

    return res;
  };

  return { getPatient };
}
