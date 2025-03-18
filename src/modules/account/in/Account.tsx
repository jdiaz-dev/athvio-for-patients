import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { Button, Text } from 'react-native-paper';

function Account() {
  const { fullnameAndSurname, signOutHandler } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
      <Text style={{ marginBottom: 50, color: 'white' }}>{fullnameAndSurname}</Text>
      <Button icon="exit-to-app" style={{ backgroundColor: '#2c9687' }} textColor="white" onPress={signOutHandler}>
        SignOut
      </Button>
    </View>
  );
}

export default Account;
