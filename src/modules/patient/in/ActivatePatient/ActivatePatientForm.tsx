import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApolloErrorOptions } from '@apollo/client/errors';
import { usePatient } from 'src/modules/patient/out/patientActions';
import { User } from 'src/modules/patient/out/patient';
import { CongratulationsScreenNavigationProp } from 'src/shared/types/types';

interface StringColorProps {
  id?: string;
  label?: string;
  color?: string;
  primary?: string;
  secondary?: string;
}
type StringBoolFunc = (s: string) => boolean;
type StringNumFunc = (s: string) => number;
type NumbColorFunc = (n: number) => StringColorProps | undefined;

const hasNumber: StringBoolFunc = (number) => new RegExp(/[0-9]/).test(number);
const hasMixed: StringBoolFunc = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);
const hasSpecial: StringBoolFunc = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);
const strengthIndicator: StringNumFunc = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

const strengthColor: NumbColorFunc = (count) => {
  if (count < 2) return { label: 'Muy débil', color: 'error.main' };
  if (count < 3) return { label: 'Débil', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Bueno', color: 'success.main' };
  if (count < 6) return { label: 'Fuerte', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// ─── Password strength helpers ───────────────────────────────────────────────

const getStrengthBarWidth = (label?: string): string => {
  switch (label) {
    case 'Poor':
      return '25%';
    case 'Weak':
      return '50%';
    case 'Normal':
      return '75%';
    case 'Good':
      return '100%';
    default:
      return '0%';
  }
};

// ─── Validation schema ────────────────────────────────────────────────────────

const validationSchema = Yup.object().shape({
  password: Yup.string().max(255).required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .test('confirmPassword', 'Both passwords must match!', (confirmPassword, ctx) => ctx.parent.password === confirmPassword),
});

// ─── Component ────────────────────────────────────────────────────────────────

const ActivatePatientForm = ({ user }: { user: string }) => {
  const navigation = useNavigation<CongratulationsScreenNavigationProp>();
  const { getUser, activatePatient } = usePatient();
  //   const { activatePatient } = useAuthentication();

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userActivated, setUserActivated] = useState(false);
  const [level, setLevel] = useState<StringColorProps | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  useEffect(() => {
    const getUserHelper = async () => {
      const res = await getUser({ user });
      if (res.data) setUserInfo(res.data.getUser);
    };
    getUserHelper();
  }, []);

  useEffect(() => {
    if (userActivated) {
      // Replace with your navigation method
      navigation.navigate('Congratulations' as never);
    }
  }, [userActivated]);

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1890ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <Text style={styles.greeting}>Hola {userInfo.firstname}!</Text>
      <Text style={styles.subText}>
        Te invito a registrar tus entrenamientos conmigo en Athvio, una forma fácil de que podamos revisar tus planes
        nutricionales y chatear conmigo.
      </Text>

      <Formik
        initialValues={{ password: '', confirmPassword: '', submit: null }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const res = await activatePatient({ user, password: values.password });
            if (res.data) setUserActivated(true);
          } catch (error: unknown) {
            const apolloErr = error as ApolloErrorOptions;
            const msg = apolloErr.graphQLErrors?.[0]?.extensions?.response?.message?.[0] ?? 'Something went wrong.';
            setStatus({ success: false });
            setErrors({ submit: msg } as any);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <View style={styles.form}>
            {/* ── Email (disabled) ── */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={userInfo.email}
                editable={false}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* ── Password ── */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.inputWithIcon, touched.password && errors.password ? styles.inputError : null]}
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={(text) => {
                    handleChange('password')(text);
                    changePassword(text);
                  }}
                  placeholder="••••••"
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword((prev) => !prev)} activeOpacity={0.7}>
                  <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

              {/* Strength bar */}
              <View style={styles.strengthRow}>
                <View style={styles.strengthBarTrack}>
                  <View
                    style={[
                      styles.strengthBarFill,
                      {
                        width: getStrengthBarWidth(level?.label) as any,
                        backgroundColor: level?.color ?? '#e0e0e0',
                      },
                    ]}
                  />
                </View>
                {level?.label ? <Text style={styles.strengthLabel}>{level.label}</Text> : null}
              </View>
            </View>

            {/* ── Confirm Password ── */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[styles.input, touched.confirmPassword && errors.confirmPassword ? styles.inputError : null]}
                secureTextEntry
                value={values.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
                placeholder="Enter confirm password"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            {/* ── Submit error ── */}
            {(errors as any).submit ? <Text style={[styles.errorText, styles.submitError]}>{(errors as any).submit}</Text> : null}

            {/* ── Submit button ── */}
            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Aceptar invitación</Text>}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ActivatePatientForm;
// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 6,
    textAlign: 'left',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
    lineHeight: 20,
    textAlign: 'left',
  },
  form: {
    gap: 16,
  },
  fieldGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    color: '#1a1a2e',
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithIcon: {
    paddingRight: 46,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'left',
  },
  submitError: {
    marginBottom: 4,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  strengthBarTrack: {
    width: 85,
    height: 8,
    borderRadius: 7,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  strengthBarFill: {
    height: '100%',
    borderRadius: 7,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1890ff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1890ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
