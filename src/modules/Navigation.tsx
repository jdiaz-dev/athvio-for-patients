import React from 'react';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatScreen from 'src/modules/chat/adapters/in/components/Chat';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParamList } from 'src/shared/types/types';
import Account from 'src/modules/account/in/Account';
import PatientPlanList from 'src/modules/patient-plans/adapters/in/components/PatientPlanList';
import NutritionalMealList from 'src/modules/nutritional-meals/adapters/in/components/NutritionalMealList';

const Tab = createBottomTabNavigator();

type NavigationProps = {
  navigation: NativeStackNavigationProp<ScreenParamList, 'Navigation'>;
};
function Navigation({ navigation }: NavigationProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation: tabNav, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
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
      <Tab.Screen
        name="NutritionalMeals"
        component={NutritionalMealList}
        options={{
          tabBarLabel: 'Anticancer meals',
          tabBarIcon: ({ color, size }) => <Icon name="food" size={size} color={color} />,
        }}
      />
      {/* <Tab.Screen
        name="PatientPlanList"
        component={PatientPlanList}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      /> */}
      {/* <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => <Icon name="chat" size={size} color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => <Icon name="account" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
