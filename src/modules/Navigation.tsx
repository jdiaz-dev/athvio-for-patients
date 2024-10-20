import React, { useContext, useEffect, useState } from 'react';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatientProfile from './patient/PatientProfile';
import PatientPlanList from './patient-plans/PatientPlanList';
import ChatScreen from 'src/modules/chat/adapters/in/components/Chat';
import SignOut from 'src/modules/authentication/adapters/in/SignOut';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
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
            const label =
              options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="PatientPlanList"
        component={PatientPlanList}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="PatientProfile"
        component={PatientProfile}
        options={{
          tabBarLabel: 'Patient profile',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="..."
        component={SignOut}
        options={{
          tabBarLabel: '...',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
