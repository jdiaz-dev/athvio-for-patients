import { ApolloError, FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { SignInResponse, SignInRequest, CredentialsSignIn, SignUpResponse, SignUpRequest } from './auth';
import { SIGN_IN, SIGN_UP_PATIENT_FROM_MOBILE } from './authQueries';
import * as AuthSlice from 'src/modules/auth/adapters/in/slicers/AuthSlice';
import { useDispatch } from 'react-redux';

export function useAuth() {
  const dispatch = useDispatch();
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
    } catch (error: unknown) {
      dispatch(AuthSlice.initializeAuthError((error as ApolloError).graphQLErrors[0].message));
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
    } catch (error: unknown) {
      dispatch(AuthSlice.initializeAuthError((error as ApolloError).graphQLErrors[0].message));
      throw error;
    }
  };

  return { signIn, signUp };
}
