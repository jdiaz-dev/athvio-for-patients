import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import ProgramItem from 'src/modules/patient-programs/adapters/in/components/PatientProgramItem';
import { usePatientPrograms } from 'src/modules/patient-programs/adapters/out/PatientProgramsActions';
import { ReduxStates } from 'src/shared/types/types';

function PatientProgramList() {
  const { assignedProfessional } = useContext(AuthContext);
  const { getPatientPrograms } = usePatientPrograms();
  const { data: patientProgramsState, error } = useSelector((state: ReduxStates) => state.patientPrograms.patientPrograms);
  console.log('assignedProfessional', assignedProfessional);
  console.log('patientProgramsState', patientProgramsState);

  useEffect(() => {
    const fetchPatientPrograms = async () => {
      if (assignedProfessional) {
        const input = {
          professional: assignedProfessional,
          offset: 0,
          limit: 30,
        };
        await getPatientPrograms(input);
      }
    };
    fetchPatientPrograms();
  }, [assignedProfessional]);
  return (
    <>
      <View style={styles.container}>
        PatientProgramList
        <ProgramItem />
      </View>
    </>
  );
}

export default PatientProgramList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2c9687',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
