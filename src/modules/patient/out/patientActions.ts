import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import {
  ActivatePatientBody,
  ActivatePatientRequest,
  ActivatePatientResponse,
  GetPatientInput,
  GetPatientRequest,
  GetPatientResponse,
  GetUserInput,
  GetUserRequest,
  GetUserResponse,
} from 'src/modules/patient/out/patient';
import { ACTIVATE_PATIENT, GET_PATIENT_FOR_MOBILE, GET_USER } from 'src/modules/patient/out/patientQueries';

export function usePatient() {
  const getUser = async (input: GetUserInput): Promise<FetchResult<GetUserResponse>> => {
    const res = await apolloClient.query<GetUserResponse, GetUserRequest>({
      query: GET_USER,
      variables: {
        input: {
          ...input,
        },
      },
    });
    return res;
  };
  const getPatientForMobile = async (input: GetPatientInput): Promise<FetchResult<GetPatientResponse>> => {
    const res = await apolloClient.query<GetPatientResponse, GetPatientRequest>({
      query: GET_PATIENT_FOR_MOBILE,
      variables: {
        input,
      },
    });

    return res;
  };
  const activatePatient = async (body: ActivatePatientBody): Promise<FetchResult<ActivatePatientResponse>> => {
    const res = await apolloClient.mutate<ActivatePatientResponse, ActivatePatientRequest>({
      mutation: ACTIVATE_PATIENT,
      variables: {
        input: body,
      },
    });
    return res;
  };

  return { getUser, getPatientForMobile, activatePatient };
}
