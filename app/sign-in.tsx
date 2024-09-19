import HelmetMain from '@/assets/SVG/helmet-main';
import { Container, Header, Logo, MainLogin, Title, ContainerButtons, SignUpContent, ContainerSignUpText, SubTitle, TitleSignUp } from './style';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useContext } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import * as WebBrowser from 'expo-web-browser';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import PasswordInput from '@/components/PasswordInput';

WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user, login, isLoading } = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState(true);	

  return (
    <Container>
      <StatusBar style="auto" backgroundColor='#1FD87F'/>
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
        <PasswordInput password={password} setPassword={setPassword}></PasswordInput>
        <ContainerButtons>
          <Button title="Entrar" onPress={() => { login(emailAddress, password)}} />
          <ButtonOutLine
            onPress={() => {}}
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