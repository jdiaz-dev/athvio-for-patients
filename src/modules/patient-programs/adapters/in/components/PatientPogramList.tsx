import React, { useContext, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import PatientProgramItem from 'src/modules/patient-programs/adapters/in/components/PatientProgramItem';
import { PatientProgram } from 'src/modules/patient-programs/adapters/out/patient-program.d';
import { usePatientPrograms } from 'src/modules/patient-programs/adapters/out/PatientProgramsActions';
import { ReduxStates } from 'src/shared/types/types';
import { ProgramsStackParamList } from 'src/modules/patient-programs/adapters/in/components/ProgramNavigator';

type NavigationProp = NativeStackNavigationProp<ProgramsStackParamList, 'PatientProgramList'>;

function PatientProgramList() {
  const navigation = useNavigation<NavigationProp>();
  const { assignedProfessional } = useContext(AuthContext);
  const { getPatientPrograms } = usePatientPrograms();
  const { data: patientProgramsState, error } = useSelector((state: ReduxStates) => state.patientPrograms.patientPrograms);

  useEffect(() => {
    const fetchPatientPrograms = async () => {
      if (assignedProfessional) {
        await getPatientPrograms({ professional: assignedProfessional, offset: 0, limit: 30 });
      }
    };
    fetchPatientPrograms();
  }, [assignedProfessional]);

  const renderItem: ListRenderItem<PatientProgram> = ({ item, index }) => (
    <PatientProgramItem
      patientProgram={item}
      index={index}
      onPress={() => navigation.navigate('PatientProgramDetail', { patientProgram: item.uuid })}
    />
  );

  return (
    <>
      <View style={styles.container}>PatientProgramList</View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={patientProgramsState || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.uuid}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
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
  flatList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
});
