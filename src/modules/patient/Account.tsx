import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PatientInformation from 'src/modules/patient/in/PatientInformation';
import SignOut from 'src/modules/patient/in/SignOut';
import ThemeToggle from 'src/shared/theme/ThemeToggle';

function Account() {
  const paperTheme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
      <PatientInformation />
      <ThemeToggle />
      <SignOut />
    </View>
  );
}

export default Account;
