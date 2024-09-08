import HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, ContainerButtons, SignUpContent, ContainerSignUpText, SubTitle, TitleSignUp } from './style';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as WebBrowser from 'expo-web-browser';
import { Link, useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleLogin() {
    router.push("/(public)");
  }

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  async function GoogleSignIn() {
    try {
      setIsLoading(true);
      const redirectUrl = Linking.createURL("/");  // Certifique-se de que o URL está correto
      const { authSessionResult, createdSessionId, setActive } = await startOAuthFlow({ redirectUrl });

      if (authSessionResult?.type === "success") {
        console.log(authSessionResult);
        if (setActive) {
          await setActive({ session: createdSessionId });
        }
        router.push("/(public)");
      } else {
        console.log('Erro ao logar com Google');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <Container>
      <StatusBar style="auto" />
      <Header>
        <Logo>MOTOCAR</Logo>
      </Header>

      <HelmetMain />

      <MainLogin>
        <Title>Bem-Vindo</Title>

        <Input
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
          <Button title="Entrar" onPress={handleLogin} />
          <ButtonOutLine
            isLoading={isLoading}
            onPress={GoogleSignIn}
            icon="logo-google"
            title="Entrar com o Google"
          />
        </ContainerButtons>
      </MainLogin>

      <Link href={'/signUp'} asChild>
        <SignUpContent>
          <ContainerSignUpText>
            <TitleSignUp>Sou novo aqui</TitleSignUp>
            <SubTitle>Cadastrar-me</SubTitle>
          </ContainerSignUpText>
          <EvilIcons name="arrow-right" size={50} color="#1FD87F" />
        </SignUpContent>
      </Link>
    </Container>
  );
}
