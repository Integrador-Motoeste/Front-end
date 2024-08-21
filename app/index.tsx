import  HelmetMain from '@/assets/SVG/helmet-main';
import { styled } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading'
import { useState } from 'react';
import { useFonts, InterTight_300Light ,Inter_400Regular ,Inter_900Black, InterTight_500Medium, InterTight_400Regular, InterTight_600SemiBold } from '@expo-google-fonts/dev';
import { View, Text } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { SignedIn, useAuth, useUser } from '@clerk/clerk-expo';
import  Input  from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AppIndex from './(tabs)';
export default function AppLogin() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const { signOut } = useAuth();
    const { user } = useUser();
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        // router.replace('/(tabs)/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

    let [fontsLoaded] = useFonts({
        Inter_900Black,
        InterTight_500Medium,
        InterTight_400Regular,
        Inter_400Regular,
        InterTight_600SemiBold,
        InterTight_300Light,
    });

    const handleSignOut = async () => {
        try {
          await signOut();
          console.log('Usuário deslogado com sucesso!');
          // Você pode redirecionar o usuário para a tela de login aqui, se necessário
        } catch (error) {
          console.error('Erro ao deslogar:', error);
        }
      };

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {

    return (
    //     <Container>
    //         <StatusBar style="auto" />
    //         <Header>
    //             <Logo>MOTOCAR</Logo>
    //         </Header>

    //         <HelmetMain />

    //         <MainLogin>
    //             <Title>Bem-Vindo</Title>
    //             <SignedIn>
    //                 <Text>Olá, {user?.emailAddresses[0].emailAddress}</Text>
    //                 <Button title="Sair" onPress={handleSignOut} />

    //             </SignedIn>
    //             <View>
    //   {!pendingVerification && (
    //     <>
    //       <Input
    //         autoCapitalize="none"
    //         value={emailAddress}
    //         placeholder="Email"
    //         onChangeText={(email: string)=> setEmailAddress(email)}
    //       />
    //       <Input
    //         value={password}
    //         placeholder="Senha"
    //         secureTextEntry={true}
    //         onChangeText={(password: string)=> setPassword(password)}
    //       />
    //       <ContainerButtons>
    //       <Button title="Entrar" onPress={onSignUpPress} />
    //       <ButtonOutLine title="Entrar com o Google"/>
    //       </ContainerButtons>
          
            

    //     </>
    //   )}
    //   {pendingVerification && (
    //     <>
    //       <Input value={code} placeholder="Code..." onChangeText={(code: string)=> setCode(code)} />
    //       <Button title="Verify Email" onPress={onPressVerify} />
    //     </>
    //   )}
    // </View>
    //         </MainLogin>

    //         <SignUp>
    //             <ContainerSignUpText>
    //                 <TitleSignUp>Sou novo aqui</TitleSignUp>
    //                 <SubTitle>Cadastrar-me</SubTitle>
    //             </ContainerSignUpText>
    //                 <EvilIcons name="arrow-right" size={50} color="#1FD87F" /> 
    //         </SignUp>

    //     </Container>
    <AppIndex></AppIndex>
    )
}
}

const ContainerButtons = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    position: relative;
    margin-top: 12%;
`;

const Title = styled.Text`
    color: #ffffff;
    font-size: 30px;
    font-weight: 400;
    font-family: "Inter_400Regular";
    margin-bottom: 25px;
`;

const MainLogin = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    position: absolute;
    z-index: 1;
    top: 32%;
`;

const Header = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    position: absolute;
    z-index: 1;
    top: 10%;
`;

const Logo = styled.Text`
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    font-family: "Inter_900Black";
`;

const Container = styled(SafeAreaView)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #ffffff;
    position: relative;
    width: 100%;
    flex: 1;
`;


const SignUp = styled.View`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    bottom: 7%;
    right: 20px;
    align-self: flex-end;
    justify-self: flex-end;
    position: absolute;
`;

const ContainerSignUpText = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    height: auto;
    
`;

const TitleSignUp = styled.Text`
    color: #1FD87F;
    font-size: 30px;
    font-weight: 400;
    font-family: "InterTight_300Light";
    margin-bottom: 0px;
`;

const SubTitle = styled.Text`
    color: #0EC16B; 
    font-size: 20px;
    font-weight: 400;
    font-family: "InterTight_600SemiBold";
`;      
