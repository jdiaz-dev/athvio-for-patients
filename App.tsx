import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';
import SignIn from './src/modules/authentication/adapters/in/components/SignIn';
import { apolloClient } from './src/core/graphql/ApolloClient';
import Navigation from './src/modules/Navigation';
import AuthProvider from 'src/modules/authentication/adapters/in/components/providers/AuthProvider';
import PublicRoute from 'src/core/router/PublicRoute';
import PrivateRoute from 'src/core/router/PrivateRoute';
import { Provider } from 'react-redux';
import store from 'src/core/redux/configureStore';
import { ScreenParamList } from 'src/shared/types/types';
import SignUp from 'src/modules/authentication/adapters/in/components/SignUp';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Stack = createNativeStackNavigator<ScreenParamList>();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Provider store={store}>
            <AuthProvider>
              <Stack.Navigator initialRouteName="SignUp">
                <Stack.Screen
                  name="SignUp"
                  options={() => ({
                    headerShown: false,
                    headerLeft: () => null,
                    headerTitleStyle: {
                      ...styles.headerTitleStyle,
                    },
                    headerStyle: {
                      ...styles.headerStyle,
                    },
                  })}
                  component={() => (
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  )}
                />
                <Stack.Screen
                  name="SignIn"
                  options={() => ({
                    headerShown: false,
                    headerLeft: () => null,
                    headerTitleStyle: {
                      ...styles.headerTitleStyle,
                    },
                    headerStyle: {
                      ...styles.headerStyle,
                    },
                  })}
                  component={() => (
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  )}
                />
                <Stack.Screen
                  name="Navigation"
                  options={({ route }) => ({
                    headerShown: true,
                    headerLeft: () => null,
                    headerBackVisible: false,
                    headerTitle: route.params.tabTitle,
                    headerTitleStyle: {
                      ...styles.headerTitleStyle,
                    },
                    headerStyle: {
                      ...styles.headerStyle,
                    },
                  })}
                  component={(props: any) => (
                    <PrivateRoute>
                      <Navigation {...props} />
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
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e8f2f0',
  },
  headerStyle: {
    backgroundColor: '#2c9687',
    height: 35,
  },
});
