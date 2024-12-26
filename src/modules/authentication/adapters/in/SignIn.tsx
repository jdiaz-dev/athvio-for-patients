import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';

function SignIn() {
  const { signInHandler } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const logIn = async () => {
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

  return (
    <View style={{ /*  alignItems: 'center', */ justifyContent: 'center', backgroundColor: '#121212', height: '100%' }}>
      <TextInput mode="outlined" style={styles.input} textColor="white" onChangeText={setEmail} value={email} />
      <TextInput
        mode="outlined"
        style={styles.input}
        textColor="white"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={secureTextEntry}
        right={<TextInput.Icon icon={secureTextEntry ? 'eye' : 'eye-off'}  color="white" onPress={() => setSecureTextEntry(!secureTextEntry)} />}
      />
      <Button onPress={logIn} mode="contained" buttonColor="#2c9687">
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
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#323232',
  },
});

export default SignIn;
