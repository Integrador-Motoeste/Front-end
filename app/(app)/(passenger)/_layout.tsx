import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
<<<<<<< HEAD:app/(passenger)/_layout.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
=======
import { Link, SplashScreen, Tabs, useSegments, useRouter, useLocalSearchParams, Slot } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
>>>>>>> eaaf00bbf31f9799f36819ad7a16339030ce1aff:app/(app)/(passenger)/_layout.tsx
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
<<<<<<< HEAD:app/(passenger)/_layout.tsx
          title: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="racing-helmet" size={40} color="white" />,
=======
          title: 'Corrida',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
>>>>>>> eaaf00bbf31f9799f36819ad7a16339030ce1aff:app/(app)/(passenger)/_layout.tsx
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
<<<<<<< HEAD:app/(passenger)/_layout.tsx
      />
=======
        />
      <Tabs.Screen
        name="ridehistory/index"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
        />
>>>>>>> eaaf00bbf31f9799f36819ad7a16339030ce1aff:app/(app)/(passenger)/_layout.tsx
    </Tabs>
  );
}
