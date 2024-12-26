import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList, ListRenderItem, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';
import { usePatientPlans } from 'src/modules/patient-plans/adapters/out/PatientPlanActions';
import { ReduxStates } from 'src/shared/types/types';
import PatientPlanItem from 'src/modules/patient-plans/adapters/in/components/PatientPlanItem';

//this is a function not a component
const renderItem: ListRenderItem<PatientPlanBody> = ({ item }) => {
  return <PatientPlanItem patientPlan={item} />;
};
function PatientPlanList() {
  const { patient } = useContext(AuthContext);
  const { getPatientPlans } = usePatientPlans();
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);

  useEffect(() => {
    const getPatientPlansHelper = async () => {
      if (patient !== null) {
        const input = {
          patient,
          offset: 0,
          limit: 30,
        };
        await getPatientPlans(input);
      }
    };
    getPatientPlansHelper();
  }, [patient]);

  return (
    <FlatList
      data={patientPlansState ? patientPlansState : []}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      // contentContainerStyle={styles.chatContainer}
      // showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ ...styles.container }}
    />
  );
}

export default PatientPlanList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
});
