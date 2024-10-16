import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { SignInResponse, SignInRequest, CredentialsSignIn } from './authentication';
import { SIGN_IN } from './authenticationQueries';

export function useAuthentication() {
  const signIn = async (credentials: CredentialsSignIn): Promise<FetchResult<SignInResponse>> => {
    const res = await apolloClient.mutate<SignInResponse, SignInRequest>({
      mutation: SIGN_IN,
      variables: {
        input: {
          ...credentials,
        },
      },
    });

    return res;
  };

  return { signIn };
}
