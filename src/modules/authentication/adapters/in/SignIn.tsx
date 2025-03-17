import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { SignUpScreenNavigationProp } from 'src/shared/types/types';
import { useNavigation } from '@react-navigation/native';
import { formStyles } from 'src/modules/authentication/adapters/in/styles/styles';

function SignIn() {
  const { signInHandler } = useContext(AuthContext);
  const navigation = useNavigation<SignUpScreenNavigationProp>();

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
    <View style={formStyles.container}>
      <Text style={formStyles.title}>Sign In</Text>
      <TextInput
        label="Email Address"
        mode="outlined"
        style={formStyles.input}
        textColor="white"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        label="Password"
        mode="outlined"
        style={formStyles.input}
        textColor="white"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={secureTextEntry}
        /* right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye' : 'eye-off'}
            color="white"
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        } */
      />
      <Button style={formStyles.button} onPress={logIn} mode="contained" buttonColor="#2c9687">
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
      <Text>env var 1: {process.env.EXPO_PUBLIC_GRAPHQL_REST_URL}</Text>
      <Text>env var 2: {process.env.EXPO_PUBLIC_GRAPHQL_WS_URL}</Text>
      <TouchableOpacity>
        <Text style={formStyles.link} onPress={() => navigation.navigate('SignUp')}>
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;
