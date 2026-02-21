import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { PatientProgram } from 'src/modules/patient-programs/adapters/out/patient-program';
import PatientProgramDetail from 'src/modules/patient-programs/adapters/in/components/PatientProgramDetail';

function PatientProgramItem({
  patientProgram,
  index,
  onPress,
}: {
  patientProgram: PatientProgram;
  index: number;
  onPress: () => void;
}) {
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const handlePress = () => {};

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Surface style={{ ...styles.card }} elevation={5}>
          <View style={styles.program}>{patientProgram.name}</View>
        </Surface>
      </TouchableOpacity>
    </>
  );
}

export default PatientProgramItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  program: {
    padding: 16,
  },
});
