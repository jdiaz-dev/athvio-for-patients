import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { SignInResponse, SignInRequest, CredentialsSignIn, SignUpResponse, SignUpRequest } from './authentication';
import { SIGN_IN, SIGN_UP_PATIENT_FROM_MOBILE } from './authenticationQueries';

export function useAuthentication() {
  const signIn = async (credentials: CredentialsSignIn): Promise<FetchResult<SignInResponse>> => {
    try {
      const res = await apolloClient.mutate<SignInResponse, SignInRequest>({
        mutation: SIGN_IN,
        variables: {
          input: {
            ...credentials,
          },
        },
      });
      return res;
    } catch (error) {
      console.log('---------error', error);
      throw error;
    }
  };

  const signUp = async (credentials: CredentialsSignIn): Promise<FetchResult<SignUpResponse>> => {
    try {
      const res = await apolloClient.mutate<SignUpResponse, SignUpRequest>({
        mutation: SIGN_UP_PATIENT_FROM_MOBILE,
        variables: {
          input: {
            ...credentials,
          },
        },
      });
      return res;
    } catch (error) {
      console.log('---------error', error);
      throw error;
    }
  };

  return { signIn, signUp };
}
