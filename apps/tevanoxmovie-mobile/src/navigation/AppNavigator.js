import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/main/Home';
import Browse from '../screens/main/Browse';
import Downloads from '../screens/main/Downloads';
import Profile from '../screens/main/Profile';

import MovieDetail from '../screens/movie/MovieDetail';
import MoviePlayer from '../screens/movie/MoviePlayer';
import MusicDetail from '../screens/music/MusicDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: 'home',
            Browse: 'search',
            Downloads: 'download',
            Profile: 'person',
          };
          return <Icon name={icons[route.name] || 'circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4757',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { backgroundColor: '#1a1a2e', borderTopColor: '#2a2a3e' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Browse" component={Browse} />
      <Tab.Screen name="Downloads" component={Downloads} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
      <Stack.Screen name="MoviePlayer" component={MoviePlayer} />
      <Stack.Screen name="MusicDetail" component={MusicDetail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;