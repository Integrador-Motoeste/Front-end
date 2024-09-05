import { Slot } from 'expo-router'
import { useFonts,InterTight_300Light, Inter_400Regular, Inter_900Black, Inter_600SemiBold, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/dev';

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

  return (
    <Slot/>
  )
}