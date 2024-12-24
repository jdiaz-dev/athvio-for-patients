import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { removeSessionCokkies } from 'src/modules/authentication/adapters/out/storage';
import { SignInScreenNavigationProp } from 'src/shared/types/types';
import { Button } from 'react-native-paper';

function Account() {
  const { fullnameAndSurname } = useContext(AuthContext);
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const signOuntHandler = () => {
    removeSessionCokkies();
    navigation.navigate('SignIn');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 50 }}>{fullnameAndSurname}</View>
      <Button icon="exit-to-app" style={{ backgroundColor: 'blue' }} textColor="white" onPress={signOuntHandler}>
        SignOut
      </Button>
    </View>
  );
}

export default Account;
