import HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, ContainerButtons } from './(public)/style';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useFonts, InterTight_300Light, Inter_400Regular, Inter_900Black, InterTight_500Medium, InterTight_400Regular, Inter_600SemiBold } from '@expo-google-fonts/dev';
import { View } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import SignUpButton from '@/components/ButtonSignUp';
import * as WebBrowser from 'expo-web-browser';
import * as google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    InterTight_500Medium,
    InterTight_400Regular,
    Inter_400Regular,
    Inter_600SemiBold,
    InterTight_300Light,
  });

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const androidClientId = process.env.GOOGLE_ANDROID_CLIENT_ID || '507414026561-gfca7tkm5vlpra3qsughq3vkjq2p0j6f.apps.googleusercontent.com';
  const webClientId = '507414026561-0m88ul26kaqjq9b299t1vhbsfqso2n33.apps.googleusercontent.com'

  const config = {
    androidClientId,
    webClientId,
    redirectUri: `https://auth.expo.io/@DavyDantas/MOTO_FRONT`,

  };

  const [request, response, promptAsync] = google.useAuthRequest(config);

  const handleToken =() => {

    if (response?.type === 'success') {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log(token);
      setIsLoading(false);
      
    } else if (response?.type === 'error' || response?.type === 'cancel') {
      setIsLoading(false);
      
    }
  }

  useEffect(() => {
    handleToken()
  }, [response]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <Header>
        <Logo>MOTOCAR</Logo>
      </Header>

      <HelmetMain />

      <MainLogin>
        <Title>Bem-Vindo</Title>

        <View>
          <Input
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={(email: string) => setEmailAddress(email)}
          />
          <Input
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(password: string) => setPassword(password)}
          />
          <ContainerButtons>
            <Button title="Entrar" />
            <ButtonOutLine
              isLoading={isLoading}
              onPress={() => {
                setIsLoading(true);
                promptAsync();
              }}
              icon="logo-google"
              title="Entrar com o Google"
            />
          </ContainerButtons>
        </View>
      </MainLogin>

      <SignUpButton />
    </Container>
  );
}
