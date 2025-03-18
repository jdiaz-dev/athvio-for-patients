import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { formStyles } from 'src/modules/authentication/adapters/in/components/styles/styles';

function TitleApp() {
  return (
    <View>
      <Text style={formStyles.title}>ANTICANCER</Text>
      <Text style={formStyles.title}>MEALS</Text>
      <Text style={formStyles.title}></Text>
      <Text style={formStyles.title}></Text>
    </View>
  );
}

export default TitleApp;
