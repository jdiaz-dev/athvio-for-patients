import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { SIGN_IN } from './out/ClientQueries';
import { SignInMutation, SignInRequest } from './out/authorization.types';

function SignIn() {
  const [signInHandler, { data }] = useMutation<SignInMutation, SignInRequest>(SIGN_IN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* const onSubmit = async (dataUser: CredentialsSignIn): Promise<void> => {
    try {
      await signInHandler({
        variables: {
          input: {
            ...dataUser,
          },
        },
      });
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
    }
  }; */
  console.log('-----data', data)
  const logIn = async () => {
    console.log('------email', email);
    console.log('------password', password);
    await signInHandler({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
  return (
    <SafeAreaView>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} keyboardType="email-address" />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Button onPress={logIn} title="Log in" color="#841584" accessibilityLabel="Learn more about this purple button" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignIn;
