import { gql } from '@apollo/client';

export const GET_USER = gql`
  query _getUser($input: GetUserDto!) {
    getUser(input: $input) {
      uuid
      firstname
      lastname
      email
    }
  }
`;

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

export const ACTIVATE_PATIENT = gql`
  mutation _activatePatient($input: ActivatePatientDto!) {
    activatePatient(input: $input) {
      uuid
    }
  }
`;
