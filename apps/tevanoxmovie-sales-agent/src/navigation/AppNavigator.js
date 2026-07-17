import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../screens/main/Dashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const icons = { Dashboard: 'dashboard', Team: 'people', Earnings: 'trending-up', Withdraw: 'account-balance-wallet' };
        return <Icon name={icons[route.name] || 'circle'} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#9C27B0',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: { backgroundColor: '#1a1a2e', borderTopColor: '#2a2a3e' },
      headerShown: false,
    })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
