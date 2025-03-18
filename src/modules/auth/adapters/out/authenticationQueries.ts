import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($input: SignInDto!) {
    signIn(input: $input) {
      _id
      role
      token
    }
  }
`;

export const SIGN_UP_PATIENT_FROM_MOBILE = gql`
  mutation _signUpPatientFromMobile($input: SignUpPatientFromMobileDto!) {
    signUpPatientFromMobile(input: $input) {
      _id
      role
      token
    }
  }
`;
