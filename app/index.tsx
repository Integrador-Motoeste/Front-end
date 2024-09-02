import HelmetMain from '@/assets/SVG/helmet-main';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import Input from '@/components/Input';
import { MaterialIcons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ContainerButtons, ContainerSignUpText, Header, Logo, MainLogin, PasswordInput, SignUpContent, SubTitle, Title, TitleSignUp, IconContainer} from './style';

WebBrowser.maybeCompleteAuthSession();

export default function AppLogin() {
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
              style={{paddingLeft: 16}}
              placeholder="Email"
              onChangeText={(email: string) => setEmailAddress(email)}
          />
          <PasswordInput>
            <Input
              value={password}
              placeholder="Senha"
              style={{ width: 250 }}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(password: string) => setPassword(password)}
            />
            <IconContainer>
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <MaterialIcons
                  name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                  size={20}
                  color={'#767676'}
                />
              </TouchableOpacity>
            </IconContainer>
          </PasswordInput>

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