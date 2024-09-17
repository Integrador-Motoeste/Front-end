import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
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
          tabBarIcon: ({ color }) => <MaterialIcons name="reorder" size={40} color="white" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="racing-helmet" size={40} color="white" />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={40} color="white" />,
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
