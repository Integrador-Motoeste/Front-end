import  HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, ContainerButtons } from './style';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useFonts, InterTight_300Light ,Inter_400Regular ,Inter_900Black, InterTight_500Medium, InterTight_400Regular, Inter_600SemiBold } from '@expo-google-fonts/dev';
import { View } from 'react-native'
import { useEffect } from 'react';
import  Input  from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import SignUpButton from '@/components/ButtonSignUp';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession()

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

  const googleOAuth = useOAuth({ strategy: 'oauth_google' });
  async function onGoogleSignIn() {
    try {
      setIsLoading(true);
      
      const OAuthFlow = await googleOAuth.startOAuthFlow();
  
      if (OAuthFlow.authSessionResult?.type === 'success') {
        if (OAuthFlow.setActive) {
          await OAuthFlow.setActive({ session: OAuthFlow.createdSessionId });
        }
      } else if (OAuthFlow.authSessionResult?.type === 'cancel') {
        // Login cancelado, então permanecer na tela de login
        console.log('Login Google cancelado');
        // Você pode mostrar uma mensagem de erro ou apenas resetar o estado
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
  
    } catch (err) {
      console.error('Erro durante o fluxo de login do Google:', err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync()
    }
  })

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
            onChangeText={(email: string)=> setEmailAddress(email)}
          />
          <Input
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(password: string)=> setPassword(password)}
          />
          <ContainerButtons>
            <Button title="Entrar"  />
            <ButtonOutLine isLoading={isLoading} onPress={onGoogleSignIn} icon='logo-google' title="Entrar com o Google"/>
          </ContainerButtons>
          
    
        </View>

            </MainLogin>

            <SignUpButton/>

        </Container>
    )
}
 
