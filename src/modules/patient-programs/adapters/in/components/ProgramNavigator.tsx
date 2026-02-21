import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientProgramList from 'src/modules/patient-programs/adapters/in/components/PatientPogramList';
import PatientProgramDetail from 'src/modules/patient-programs/adapters/in/components/PatientProgramDetail';
import { PatientProgram } from 'src/modules/patient-programs/adapters/out/patient-program';

export type ProgramsStackParamList = {
  PatientProgramList: undefined;
  PatientProgramDetail: { patientProgram: string };
};

const Stack = createNativeStackNavigator<ProgramsStackParamList>();

function ProgramsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientProgramList" component={PatientProgramList} />
      <Stack.Screen name="PatientProgramDetail" component={PatientProgramDetail} />
    </Stack.Navigator>
  );
}

export default ProgramsNavigator;
