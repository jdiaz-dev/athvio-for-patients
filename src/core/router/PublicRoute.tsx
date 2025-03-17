import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useContext } from 'react';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { NavigationScreenNavigationProp } from 'src/shared/types/types';

function PublicRoute({ children }: { children: ReactNode }) {
  const navigation = useNavigation<NavigationScreenNavigationProp>();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    navigation.navigate('Navigation', { tabTitle: 'Meals' });
  }
  return <>{children}</>;
}

export default PublicRoute;
