import HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, ContainerButtons, SignUpContent, ContainerSignUpText, SubTitle, TitleSignUp} from './style';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as WebBrowser from 'expo-web-browser';
import { Link, router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    router.push('/(public)');
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
            <Button title="Entrar" onPress={() => handleLogin()}/>

            <ButtonOutLine
              isLoading={isLoading}
              onPress={() => {
                setIsLoading(true);
              }}
              icon="logo-google"
              title="Entrar com o Google"
            />
          </ContainerButtons> 
        
      </MainLogin>
      
      <Link href={'/signUp'} asChild>
        <SignUpContent >
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
