import HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, 
  ContainerButtons, SignUpContent, ContainerSignUpText, 
  SubTitle, TitleSignUp } from './style';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as WebBrowser from 'expo-web-browser';
import { Link, useRouter } from 'expo-router';
import { useSignIn , useClerk, useOAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import React from 'react';
import PasswordInput from '@/components/PasswordInput';
import axios from 'axios';


WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();
  const { user , isSignedIn } = useUser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { signIn, setActive, isLoaded } = useSignIn();

  async function GoogleSignIn() {
    try {
      setIsLoadingButton(true);
      const redirectUrl = Linking.createURL("/");
      const oAuthFlow = await startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
        router.replace("/redirect");

      } else {
        console.log('Erro ao logar com Google');
        setIsLoadingButton(false);
        router.replace("/(auth)");
      }

    } catch (error) {
      console.log(error);
      signOut()
      setIsLoadingButton(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    if (!isLoaded) {
      console.log('Usuário não carregado');
      setIsLoadingButton(false);
      return;
    } else{

      const userInfo = {
        email: user?.emailAddresses[0].emailAddress,
        first_name: user?.firstName,
        last_name: user?.lastName,
        id_clerk_user: user?.id,
      };
      
      console.log(userInfo);
      axios.post('http://192.168.0.16:8000/api/users/users/create_user/', userInfo);

    }

    return () => {
      WebBrowser.coolDownAsync();
    };

  }, [isLoaded, isSignedIn]);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/redirect')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

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
        <PasswordInput password={password} setPassword={setPassword} />

        <ContainerButtons>
          <Button title="Entrar" onPress={onSignInPress} />
          <ButtonOutLine
            isLoading={isLoadingButton}
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