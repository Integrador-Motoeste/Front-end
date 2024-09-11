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
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import axios from 'axios';
import PasswordInput from '@/components/PasswordInput';
import UserService, {createUser} from '../services/users'; '@/app/services/users';


// Ensure PasswordInput returns a valid JSX element

WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleLogin() {
    router.push("/");
  }

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  async function GoogleSignIn() {
    try {
      setIsLoading(true);
      const redirectUrl = Linking.createURL("/");
      const oAuthFlow = await startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
        
        router.replace("/");

      } else if (oAuthFlow.authSessionResult?.type === "cancel") {
        console.log('Erro ao logar com Google');
        setIsLoading(false);
        router.replace("/(auth)");

      } else {
        console.log('Erro ao logar com Google');
        setIsLoading(false);
        router.replace("/(auth)");
      }

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    if (!isLoaded) {
      console.log('Usuário não carregado');
      setIsLoading(false);
      return;
    } 

    if (!isSignedIn){
      return;
    } else {
      
      const userInfo = {
        email: user?.emailAddresses[0].emailAddress as string,
        first_name: user?.firstName as string,
        last_name: user?.lastName as string,
        id_clerk_user: user?.id as string,
      };
      
      async function createUser() {
        const userService = new UserService("");
        const response = await userService.createUser(userInfo);
      }
    
      createUser();
    }

    return () => {
      WebBrowser.coolDownAsync();
    };

    
  }, [GoogleSignIn]);

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
        <PasswordInput password={password} setPassword={setPassword}>
        </PasswordInput>

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