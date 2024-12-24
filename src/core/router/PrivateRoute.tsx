import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useContext } from 'react';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { SignInScreenNavigationProp } from 'src/shared/types/types';

function PrivateRoute({ children }: { children: ReactNode }) {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    navigation.navigate('SignIn');
  }
  return <>{children}</>;
}

export default PrivateRoute;
