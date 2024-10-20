import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

function PatientPlanList() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="PatientPlanList" onPress={() => navigation.navigate('PatientProfile', { name: 'Jane' })} />
    </View>
  );
}

export default PatientPlanList;
