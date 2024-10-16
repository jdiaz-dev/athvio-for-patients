import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useContext } from 'react';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';

function PublicRoute({ children }: { children: ReactNode }) {
  const navigation = useNavigation();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    navigation.navigate('Navigation');
  }
  return <>{children}</>;
}

export default PublicRoute;
