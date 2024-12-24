import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode, useContext } from 'react';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { RootStackParamList } from 'src/shared/types/types';

type NavigationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Navigation'>;

function PublicRoute({ children }: { children: ReactNode }) {
  const navigation = useNavigation<NavigationScreenNavigationProp>();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    navigation.navigate('Navigation', { tabTitle: 'Plans' });
  }
  return <>{children}</>;
}

export default PublicRoute;
