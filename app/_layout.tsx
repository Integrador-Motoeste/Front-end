import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useContext } from 'react';
import 'react-native-reanimated';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_900Black, InterTight_300Light } from '@expo-google-fonts/dev';
import { AuthContext } from '@/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AppLogin from './(auth)';
import { AuthProvider } from '@/context/AuthContext';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(pilot)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {

  const [loaded, error] = useFonts({
    Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_900Black, InterTight_300Light
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot></Slot>
    </AuthProvider>
  )
}
