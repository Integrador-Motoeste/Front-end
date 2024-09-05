import { Slot } from 'expo-router'
import { useFonts,InterTight_300Light, Inter_400Regular, Inter_900Black, Inter_600SemiBold, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/dev';
import { ClerkProvider } from "@clerk/clerk-expo"

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
    InterTight_300Light,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null; // ou um spinner de carregamento
  }

  const PUBLIC_CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

  return (
    <ClerkProvider publishableKey={PUBLIC_CLERK_KEY}>
      <Slot/>
    </ClerkProvider>
  )
}