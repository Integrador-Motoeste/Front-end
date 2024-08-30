import { Slot } from 'expo-router'
import { useFonts, InterTight_300Light, Inter_400Regular, Inter_900Black, InterTight_500Medium, InterTight_400Regular, Inter_600SemiBold, Inter_500Medium } from '@expo-google-fonts/dev';

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    InterTight_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
    InterTight_300Light,
  });

  if (!fontsLoaded) {
    return null; // ou um spinner de carregamento
  }

  return (
    <Slot/>
  )
}