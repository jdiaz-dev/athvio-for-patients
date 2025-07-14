import { gql } from '@apollo/client';

export const GET_PATIENT = gql`
  query _getPatientForMobile($input: GetPatientForMobileDto!) {
    getPatientForMobile(input: $input) {
      uuid
      user {
        uuid
        firstname
        lastname
      }
      professional
    }
  }
`;
