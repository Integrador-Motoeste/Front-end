import HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, ContainerButtons, SignUpContent, ContainerSignUpText, SubTitle, TitleSignUp} from './style';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useFonts, InterTight_300Light, Inter_400Regular, Inter_900Black, InterTight_500Medium, InterTight_400Regular, Inter_600SemiBold } from '@expo-google-fonts/dev';
import { View } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as WebBrowser from 'expo-web-browser';
import * as google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';

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

  const androidClientId = process.env.GOOGLE_ANDROID_CLIENT_ID || '73964452277-iio80k209bamfprkdkd91c4ibuu67l91.apps.googleusercontent.com'
  const webClientId = '73964452277-jv69sv8mqopj74vlvfinm4s2hhhil20u.apps.googleusercontent.com'
  
  const config = {
    androidClientId,
    webClientId,
    redirectUri: `https://auth.expo.io/@davydantas/MOTO_FRONT`,
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

  function handleSignUp(){
    router.navigate('/SignUp');
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

      <SignUpContent onPress={() => handleSignUp()}>
            <ContainerSignUpText>
                <TitleSignUp>Sou novo aqui</TitleSignUp>
                <SubTitle>Cadastrar-me</SubTitle>
            </ContainerSignUpText>
                <EvilIcons name="arrow-right" size={50} color="#1FD87F" /> 
        </SignUpContent>

    </Container>
  );
}
