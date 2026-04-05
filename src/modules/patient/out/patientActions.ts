import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { GetPatientInput, GetPatientRequest, GetPatientResponse } from 'src/modules/patient/out/patient';
import { GET_PATIENT_FOR_MOBILE } from 'src/modules/patient/out/patientQueries';

export function usePatient() {
  const getPatientForMobile = async (input: GetPatientInput): Promise<FetchResult<GetPatientResponse>> => {
    const res = await apolloClient.query<GetPatientResponse, GetPatientRequest>({
      query: GET_PATIENT_FOR_MOBILE,
      variables: {
        input,
      },
    });

    return res;
  };

  return { getPatientForMobile };
}
