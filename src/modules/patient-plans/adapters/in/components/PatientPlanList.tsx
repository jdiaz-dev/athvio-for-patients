import React, { useContext, useEffect } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';
import { usePatientPlans } from 'src/modules/patient-plans/adapters/out/PatientPlanActions';
import { ReduxStates } from 'src/shared/types/types';

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

  const renderItem: ListRenderItem<PatientPlanBody> = ({ item }) => <List.Item title={item.assignedDate} />;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={patientPlansState ? patientPlansState : []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={styles.chatContainer}
      />
    </View>
  );
}

export default PatientPlanList;
