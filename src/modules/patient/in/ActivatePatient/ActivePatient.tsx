import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';

import ActivatePatientForm from 'src/modules/patient/in/ActivatePatient/ActivatePatientForm';
import FormWrapper from 'src/modules/patient/in/FormWrapper/FormWrapper';

type ActivatePatientRouteParams = {
  ActivatePatient: {
    user: string;
  };
};

function ActivatePatient() {
  const route = useRoute<RouteProp<ActivatePatientRouteParams, 'ActivatePatient'>>();
  const { user } = route.params ?? {};

  return (
    <FormWrapper>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text variant="headlineMedium" style={styles.title}>
            Activa tu cuenta
          </Text>
        </View>

        <View style={styles.formContainer}>{user && <ActivatePatientForm user={user} />}</View>
      </View>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  title: {
    fontWeight: '700',
    color: '#1a1a2e',
  },
  formContainer: {
    width: '100%',
  },
});

export default ActivatePatient;
