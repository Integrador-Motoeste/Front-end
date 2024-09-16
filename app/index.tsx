import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useContext } from 'react';
import 'react-native-reanimated';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_900Black, InterTight_300Light } from '@expo-google-fonts/dev';
import { AuthContext } from '@/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AppLogin from './(auth)';


export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(pilot)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const { userToken, isLoading, user } = useContext(AuthContext);
  const router = useRouter();
    console.log(user)

  function InitialNav () {
    return (
      <Stack initialRouteName='(passenger)'>
          <Stack.Screen name="(pilot)" options={{ headerShown: false }} />
          <Stack.Screen name="(passenger)" options={{ headerShown: false }} />
      </Stack>
    )
  }

  // useEffect(() => {
  //   if (userToken === null) {
  //     router.replace('/(auth)');
  //   } else{
  //     InitialNav()
  //   }
  // }, [userToken]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1FD87F" />
      </View>
    );
  }

  return (
    <>
      { userToken === null ? <AppLogin></AppLogin> : <InitialNav></InitialNav> }
    </>
  )
}
