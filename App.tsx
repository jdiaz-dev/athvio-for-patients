import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';
import SignIn from './src/modules/auth/adapters/in/components/SignIn';
import { apolloClient } from './src/core/graphql/ApolloClient';
import Navigation from './src/modules/Navigation';
import AuthProvider from 'src/modules/auth/adapters/in/components/providers/AuthProvider';
import PublicRoute from 'src/core/router/PublicRoute';
import PrivateRoute from 'src/core/router/PrivateRoute';
import { Provider } from 'react-redux';
import store from 'src/core/redux/configureStore';
import { ScreenParamList } from 'src/shared/types/types';
import SignUp from 'src/modules/auth/adapters/in/components/SignUp';
import Frecuency from 'src/modules/frecuency/Frecuency';
import PatientQuestionary from 'src/modules/patient-questionary/adapters/in/components/PatientQuestionary';
import PatientQuestionarySuccess from 'src/modules/patient-questionary/adapters/in/components/PatientQuestionarySucess';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Stack = createNativeStackNavigator<ScreenParamList>();

const linking = {
  prefixes: ['http://localhost:19006', 'https://yourapp.com'],
  config: {
    screens: {
      SignUp: 'signup',
      SignIn: 'signin',
      Questionary: 'questionary',
      Navigation: {
        path: 'navigation/:tabTitle',
        parse: {
          tabTitle: (title: string) => decodeURIComponent(title),
        },
      },
      Frecuency: 'frecuency',
    },
  },
};

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer linking={linking}>
          <Provider store={store}>
            <AuthProvider>
              <Stack.Navigator initialRouteName="SignUp">
                <Stack.Screen
                  name="Frecuency"
                  options={{
                    headerShown: false,
                    headerTitle: 'Frecuency',
                    headerTitleStyle: {
                      ...styles.headerTitleStyle,
                    },
                    headerStyle: {
                      ...styles.headerStyle,
                    },
                  }}
                  component={() => (
                    <PublicRoute>
                      <Frecuency />
                    </PublicRoute>
                  )}
                />
                {/* <Stack.Screen
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
                /> */}
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
                  name="Questionary"
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
                  component={() => <PatientQuestionary />}
                />
                <Stack.Screen
                  name="PatientQuestionarySuccess"
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
                  component={() => <PatientQuestionarySuccess />}
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
/* stayed: create a path(screen) to see program patient detail */
