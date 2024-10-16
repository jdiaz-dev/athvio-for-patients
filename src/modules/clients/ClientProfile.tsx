import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';

function ClientProfile() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="ClientProfile" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
}

export default ClientProfile;
