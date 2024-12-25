import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { SignInResponse, SignInRequest, CredentialsSignIn } from './authentication';
import { SIGN_IN } from './authenticationQueries';

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
      console.log('------res', res)
      return res;
    } catch (error) {
      console.log('---------error', error);
      throw error;
    }
  };

  return { signIn };
}
