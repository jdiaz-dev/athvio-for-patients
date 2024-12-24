import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { GetPatientInput, GetPatientRequest, GetPatientResponse } from 'src/modules/Account/out/patient';
import { GET_PATIENT } from 'src/modules/Account/in/patientQueries';

export function usePatient() {
  const getPatient = async (credentials: GetPatientInput): Promise<FetchResult<GetPatientResponse>> => {
    const res = await apolloClient.query<GetPatientResponse, GetPatientRequest>({
      query: GET_PATIENT,
      variables: {
        input: {
          ...credentials,
        },
      },
    });

    return res;
  };

  return { getPatient };
}
