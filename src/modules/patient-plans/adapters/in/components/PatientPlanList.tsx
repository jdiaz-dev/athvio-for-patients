import React, { useContext, useEffect } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';
import { usePatientPlans } from 'src/modules/patient-plans/adapters/out/PatientPlanActions';
import { ReduxStates } from 'src/shared/types/types';
import { StyleSheet } from 'react-native';
import { IngredientType } from 'src/modules/patient-plans/adapters/out/enum';
import PatientPlanItem from 'src/modules/patient-plans/adapters/in/components/PatientPlanItem';

//this is a function not a component
const renderItem: ListRenderItem<PatientPlanBody> = ({ item }) => {
  return <PatientPlanItem patientPlan={item} />;
};
function PatientPlanList() {
  const { patient } = useContext(AuthContext);
  const { getPatientPlans } = usePatientPlans();
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const input = {
    patient,
    offset: 0,
    limit: 30,
  };
  useEffect(() => {
    const getPatientPlansHelper = async () => {
      await getPatientPlans(input);
    };
    getPatientPlansHelper();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={patientPlansState ? patientPlansState : []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={styles.chatContainer}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default PatientPlanList;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 250,
    width: 250,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
