import { gql } from '@apollo/client';

export const GET_PATIENT_FOR_MOBILE = gql`
  query _getPatientForMobile($input: GetPatientForMobileDto!) {
    getPatientForMobile(input: $input) {
      uuid
      user {
        uuid
        firstname
        lastname
        enabledModules {
          name
          isEnabled
        }
      }
      professional
    }
  }
`;
