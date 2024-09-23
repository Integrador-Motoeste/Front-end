import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListRidesIcon from '@/assets/SVG/listRides-icon-menu';
import MainIcon from '@/assets/SVG/main-icon-menu';
import ProfileIconMenu from '@/assets/SVG/profile-icon-menu';
import RideHistoryScreen from './ridehistory/index';
import MainScreen from './index';
import ProfileScreen from './profile/profile';
import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarLabelStyle: {
        fontSize: 12,
        color: 'white'
      },
      tabBarStyle: {
        height: 60,
        backgroundColor: '#1FD87F',
        marginBottom: 15,
        marginHorizontal: 20,
        borderRadius: 20,
      },
      tabBarItemStyle: {
        marginTop: 10,
      },
      tabBarHideOnKeyboard: true,
    }}>
    <Tabs.Screen
      name="ridehistory/index"
      options={{
        title: '',
        tabBarIcon: ({ color }) => <ListRidesIcon/>,
      }}
    />
    <Tabs.Screen
      name="index"
      options={{
        title: '',
        tabBarIcon: ({ color }) => <MainIcon/>,
      }}
    />
    <Tabs.Screen
      name="profile/profile"
      options={{
        title: '',
        tabBarIcon: ({ color }) => <ProfileIconMenu/>,
      }}
      />
    <Tabs.Screen
      name="payments/[id]"
      options={{
        href: null,
      }}
      />
      <Tabs.Screen
      name="profile/turnPilot/index"
      options={{
        href: null,
      }}
      />
  </Tabs>
  );
}