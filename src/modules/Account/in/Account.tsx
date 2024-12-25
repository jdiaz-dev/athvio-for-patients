import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { Button } from 'react-native-paper';

function Account() {
  const { fullnameAndSurname, signOutHandler } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 50 }}>{fullnameAndSurname}</View>
      <Button icon="exit-to-app" style={{ backgroundColor: 'blue' }} textColor="white" onPress={signOutHandler}>
        SignOut
      </Button>
    </View>
  );
}

export default Account;
