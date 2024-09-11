import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold ,InterTight_600SemiBold, Inter_900Black, InterTight_300Light, Inter_700Bold } from '@expo-google-fonts/dev';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { Slot, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { tokenCache } from './storage/toekCache';

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isLoaded } = useAuth();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if(!isSignedIn) {
      router.replace("/(auth)"); 
    } 
    
    if (isSignedIn) {
      if ((user.publicMetadata.groups as string[]).includes('Pilots')) {
        router.replace("/(pilot)"); 
      } else if ((user.publicMetadata.groups as string[]).includes('Passengers')) {
        router.replace("/(passenger)"); 
    }
    } else {
      router.replace("/(auth)"); 
    }
  }, [isSignedIn, isLoaded]);

  return isLoaded ? <Slot /> : <ActivityIndicator size="large" color="#1FD87F" />;
}

export default function Layout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    InterTight_600SemiBold,
    InterTight_300Light,
    Inter_700Bold,
    Inter_900Black,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <InitialLayout />
    </ClerkProvider>
  );
}
