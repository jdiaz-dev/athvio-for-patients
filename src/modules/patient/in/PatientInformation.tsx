import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { Text, useTheme } from 'react-native-paper';
import { useAppTheme } from 'src/shared/theme/ThemeContext';

function PatientInformation() {
  const { fullnameAndSurname } = useContext(AuthContext);
  const paperTheme = useTheme();
  const { isDark } = useAppTheme();

  return (
    <View
      style={{ alignItems: 'center', marginTop: 25, justifyContent: 'center', backgroundColor: paperTheme.colors.background }}
    >
      <Text style={{ marginBottom: 50, color: isDark ? '#fff' : '#655e5e' }}>{fullnameAndSurname}</Text>
    </View>
  );
}

export default PatientInformation;
