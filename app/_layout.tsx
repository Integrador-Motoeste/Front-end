import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, InterTight_300Light, Inter_700Bold } from '@expo-google-fonts/dev';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-react';
import { Slot, router } from 'expo-router';

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

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

  return isLoaded ? <Slot /> : <ActivityIndicator size="large" color="#0000ff" />;
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    InterTight_300Light,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null; // ou um spinner de carregamento
  }

  console.log(EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <InitialLayout/>
    </ClerkProvider>
  );
}