import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import PublicRoute from 'src/core/router/PublicRoute';
import PrivateRoute from 'src/core/router/PrivateRoute';
import { ScreenParamList } from 'src/shared/types/types';
import Frecuency from 'src/modules/frecuency/Frecuency';
import PatientQuestionary from 'src/modules/patient-questionary/adapters/in/components/PatientQuestionary';
import PatientQuestionarySuccess from 'src/modules/patient-questionary/adapters/in/components/PatientQuestionarySucess';
import ActivatePatient from 'src/modules/patient/in/ActivatePatient/ActivePatient';
import Congratulations from 'src/modules/patient/in/Congratulations';
import Navigation from 'src/core/components/Navigation';
import SignIn from 'src/modules/auth/adapters/in/components/SignIn';

const Stack = createNativeStackNavigator<ScreenParamList>();

const linking = {
  prefixes: ['http://localhost:19006', 'https://yourapp.com'],
  config: {
    screens: {
      SignUp: 'signup',
      SignIn: 'signin',
      Congratulations: 'congratulations',
      Activate: {
        path: 'activate/:user',
        parse: {
          tabTitle: (title: string) => decodeURIComponent(title),
        },
      },
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
function Screens() {
  const paperTheme = useTheme();

  const styles = StyleSheet.create({
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#e8f2f0',
    },
    headerStyle: {
      backgroundColor: paperTheme.colors.secondary,
      height: 35,
      borderColor: paperTheme.colors.secondary,
      borderBottomColor: paperTheme.colors.secondary,
      borderWidth: 3,
    },
  });
  return (
    <NavigationContainer linking={linking}>
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
          name="Activate"
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
              <ActivatePatient />
            </PublicRoute>
          )}
        />
        <Stack.Screen
          name="Congratulations"
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
              <Congratulations />
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
    </NavigationContainer>
  );
}

export default Screens;
