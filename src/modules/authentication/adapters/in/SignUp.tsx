import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SignInScreenNavigationProp } from 'src/shared/types/types';
import { formStyles } from 'src/modules/authentication/adapters/in/styles/styles';

const SignUp = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const { signUpHandler } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.title}>Sign Up</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await signUpHandler({ email: values.email, password: values.password });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label="Email Address"
              mode="outlined"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              style={formStyles.input}
              textColor="white"
            />
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={!passwordVisible}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              style={formStyles.input}
              textColor="white"
              right={
                <TextInput.Icon name={passwordVisible ? 'eye-off' : 'eye'} onPress={() => setPasswordVisible(!passwordVisible)} />
              }
            />
            <Button mode="contained" onPress={handleSubmit} style={formStyles.button}>
              Create Account
            </Button>
          </>
        )}
      </Formik>
      <TouchableOpacity style={{ marginTop: 25 }}>
        <Text style={formStyles.link} onPress={() => navigation.navigate('SignIn')}>
          Already have an account?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
