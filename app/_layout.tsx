import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold ,InterTight_600SemiBold, Inter_900Black, InterTight_300Light, Inter_700Bold } from '@expo-google-fonts/dev';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter } from 'expo-router';

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      router.replace("/(public)"); // Ajuste de rota
    } else {
      router.replace("/(auth)"); // Ajuste de rota
    }
  }, [isSignedIn, isLoaded]);

  return isLoaded ? <Slot /> : <ActivityIndicator size="large" color="#0000ff" />;
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
    return null; // ou um spinner de carregamento
  }

  return (
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <InitialLayout />
    </ClerkProvider>
  );
}
