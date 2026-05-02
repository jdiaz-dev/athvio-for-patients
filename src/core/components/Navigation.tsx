import React, { useContext } from 'react';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatScreen from 'src/modules/chat/adapters/in/components/Chat';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParamList } from 'src/shared/types/types';
import ProgramsNavigator from 'src/modules/patient-programs/adapters/in/components/ProgramNavigator';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import PatientPlanList from 'src/modules/patient-plans/adapters/in/components/PatientPlanList';
import { Text, View } from 'react-native';
import Account from 'src/modules/patient/Account';

const Tab = createBottomTabNavigator();

type NavigationProps = {
  navigation: NativeStackNavigationProp<ScreenParamList, 'Navigation'>;
};
function Navigation({ navigation }: NavigationProps) {
  const { enabledModules } = useContext(AuthContext);
  const paperTheme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation: tabNav, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          style={{
            backgroundColor: paperTheme.colors.secondary,

            // top separator
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.08)',

            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 }, // negative = top shadow
            shadowOpacity: 0.25,
            shadowRadius: 8,

            // Android shadow
            elevation: 12,
          }}
          theme={{
            colors: {
              secondaryContainer: '#1C304C', // active tab background
              onSecondaryContainer: '#ffffff', // active text/icon color
              onSurfaceVariant: '#ffffff', // inactive text/icon color
            },
          }}
          renderLabel={({ route, focused }) => {
            const { options } = descriptors[route.key];
            const label = (options.tabBarLabel || route.name) as string;

            return (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                }}
              >
                <Text
                  style={{
                    color: focused ? '#ffffff' : '#ffffff', // active : inactive
                    // fontSize: 12,
                    // fontWeight: focused ? '700' : '400',
                  }}
                >
                  {label}
                </Text>
              </View>
            );
          }}
          onTabPress={({ route, preventDefault }) => {
            const event = tabNav.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              tabNav.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
            // Update active tab title
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            navigation.setParams({ tabTitle: label as string }); // Update parent headerTitle
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }
            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            return label as string;
          }}
        />
      )}
    >
      {/* {enabledModules && enabledModules[0]?.name === 'programs' && (
        <Tab.Screen
          name="Programs"
          // component={PatientPogramList}
          component={ProgramsNavigator}
          options={{
            tabBarLabel: 'Programas',
            tabBarIcon: ({ color, size }) => <Icon name="food" size={size} color={color} />,
          }}
        />
      )} */}

      {/* <Tab.Screen
        name="NutritionalMeals"
        component={NutritionalMealList}
        options={{
          tabBarLabel: 'Anticancer meals',
          tabBarIcon: ({ color, size }) => <Icon name="food" size={size} color={color} />,
        }}
      /> */}
      {enabledModules && enabledModules[0]?.name === 'patient-plans' && (
        <Tab.Screen
          name="PatientPlanList"
          component={PatientPlanList}
          options={{
            tabBarLabel: 'Planes',
            tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          }}
        />
      )}
      {/* <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => <Icon name="chat" size={size} color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="SignOutPatient"
        component={Account}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
