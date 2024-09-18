import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, SplashScreen, Tabs, useSegments, useRouter, useLocalSearchParams, Slot } from 'expo-router';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import  MainIcon from '@/assets/SVG/main-icon-menu';
import ProfileIconMenu from '@/assets/SVG/profile-icon-menu';
import ListRidescIcon from '@/assets/SVG/listRides-icon-menu';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          tabBarIcon: ({ color }) => <ListRidescIcon/>,
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
    </Tabs>
  );
}
