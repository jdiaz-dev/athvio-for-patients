import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { Button, Text, Card, useTheme } from 'react-native-paper';

function SignOut() {
  const { signOutHandler } = useContext(AuthContext);
  const paperTheme = useTheme();

  return (
    <View style={{ gap: 16, padding: 16 }}>
      <Button
        icon="exit-to-app"
        style={{ width: '100%', backgroundColor: paperTheme.colors.primary }}
        textColor="white"
        onPress={signOutHandler}
      >
        Sign out
      </Button>
    </View>
  );
}

export default SignOut;
