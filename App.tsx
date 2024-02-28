import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientPlanLists from './src/modules/client-plans/ClientPlanList';
import ClientProfile from './src/modules/clients/ClientProfile';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SignIn from './src/modules/clients/SignIn';

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: 'http://localhost:57343/graphql',
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}

        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            // options={{ title: "Plans" }}
          />
          <Stack.Screen
            name="ClientPlans"
            component={ClientPlanLists}
            options={{ title: 'Plans' }}
            // options={{title: 'Welcome'}}
          />
          <Stack.Screen name="ClientProfile" component={ClientProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
