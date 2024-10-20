import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

function PatientProfile() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="PatientProfile" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
}

export default PatientProfile;
