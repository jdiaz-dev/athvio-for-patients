import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Snackbar, TextInput, Button } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { SignInMutation, SignInRequest } from 'src/modules/authentication/adapters/out/authorization';
import { SIGN_IN } from 'src/modules/authentication/adapters/out/authenticationQueries';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';

function SignIn() {
  const { signInHandler } = useContext(AuthContext);
  // const [signInHandler, { data, error }] = useMutation<SignInMutation, SignInRequest>(SIGN_IN);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const logIn = async () => {
    /* await signInHandler({
      variables: {
        input: {
          email,
          password,
        },
      },
    }); */
    await signInHandler({
      email,
      password,
    });
  };
  const onDismissSnackBar = () => setErrorVisible(false);

  /* useEffect(() => {
    setErrorVisible(error ? true : false);
  }, [error]); */

  const saveCredentials = () => {};

  /* if (data) {
    navigation.navigate('Navigation');
  }
 */
  return (
    <SafeAreaView>
      <TextInput mode="outlined" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput
        mode="outlined"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={secureTextEntry}
        right={<TextInput.Icon icon={secureTextEntry ? 'eye' : 'eye-off'} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
      />
      <Button onPress={logIn} mode="contained" buttonColor="#841584" accessibilityLabel="Learn more about this purple button">
        Log in
      </Button>
      {/* <Snackbar
        visible={errorVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        {error?.message}
      </Snackbar> */}
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
