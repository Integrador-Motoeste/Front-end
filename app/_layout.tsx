import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold ,InterTight_600SemiBold, Inter_900Black, InterTight_300Light, Inter_700Bold } from '@expo-google-fonts/dev';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter } from 'expo-router';
import { tokenCache } from './storage/toekCache';

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (isSignedIn) {
      router.replace("/(public)"); 
    } else {
      router.replace("/(auth)"); 
    }
  }, [isSignedIn, isLoaded]);

  return isLoaded ? <Slot /> : <ActivityIndicator size="large" color="#1FD87F" />;
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    InterTight_600SemiBold,
    InterTight_300Light,
    Inter_700Bold,
    Inter_900Black,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <InitialLayout />
    </ClerkProvider>
  );
}
