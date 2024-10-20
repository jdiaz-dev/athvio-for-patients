import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import PatientPlanLists from './src/modules/patient-plans/PatientPlanList';
import PatientProfile from './src/modules/patient/PatientProfile';
import { ApolloProvider } from '@apollo/client';
import SignIn from './src/modules/authentication/adapters/in/SignIn';
import { apolloClient } from './src/core/graphql/ApolloClient';
import Navigation from './src/modules/Navigation';
import AuthProvider from 'src/modules/authentication/adapters/in/providers/AuthProvider';
import PublicRoute from 'src/core/router/PublicRoute';
import PrivateRoute from 'src/core/router/PrivateRoute';
import { Provider } from 'react-redux';
import store from 'src/core/redux/configureStore';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {/* <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
          </View> */}
          <Provider store={store}>
            <AuthProvider>
              <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen
                  name="SignIn"
                  component={() => (
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  )}
                  // options={{ title: "Plans" }}
                />
                <Stack.Screen
                  name="ClientPlans"
                  component={() => (
                    <PrivateRoute>
                      <PatientPlanLists />
                    </PrivateRoute>
                  )}
                  options={{ title: 'Plans' }}
                  // options={{title: 'Welcome'}}
                />
                <Stack.Screen name="PatientProfile" component={PatientProfile} />
                <Stack.Screen
                  name="Navigation"
                  component={() => (
                    <PrivateRoute>
                      <Navigation />
                    </PrivateRoute>
                  )}
                />
              </Stack.Navigator>
            </AuthProvider>
          </Provider>
        </NavigationContainer>
      </PaperProvider>
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
