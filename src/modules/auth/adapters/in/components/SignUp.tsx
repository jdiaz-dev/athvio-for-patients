import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SignInScreenNavigationProp } from 'src/shared/types/types';
import { formStyles } from 'src/modules/auth/adapters/in/components/styles/styles';
import TitleApp from 'src/modules/auth/adapters/in/components/TitleApp';
import { ApolloError } from '@apollo/client';

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
      {/* <TitleApp /> */}
      <Text style={formStyles.title}>Sign Up</Text>
      <Formik
        initialValues={{ email: '', password: '', submit: null }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors }) => {
          try {
            await signUpHandler({ email: values.email, password: values.password });
          } catch (error: unknown) {
            setErrors({ submit: (error as ApolloError).graphQLErrors[0].message });
          }
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
              //   textColor="white"
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
              //   textColor="white"
              right={
                <TextInput.Icon name={passwordVisible ? 'eye-off' : 'eye'} onPress={() => setPasswordVisible(!passwordVisible)} />
              }
            />
            <HelperText type="error" visible={errors.submit !== null ? true : false}>
              {errors.submit}
            </HelperText>
            <Button mode="contained" onPress={handleSubmit} style={formStyles.button}>
              Create Account
            </Button>
          </>
        )}
      </Formik>
      <TouchableOpacity>
        <Text style={formStyles.link} onPress={() => navigation.navigate('SignIn')}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
