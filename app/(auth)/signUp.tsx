import { Container, ContainerButtons } from "./style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import UserService from "@/app/services/users";
import PasswordInput from '@/components/PasswordInput';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const { isSignedIn, user } = useUser();

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/redirect");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Container>
      {!pendingVerification && (
        <>
          <Input outline={true} value={firstName} placeholder="Nome" onChangeText={(value) => setFirstName(value)} />
          <Input outline={true} value={lastName} placeholder="Sobrenome" onChangeText={(value) => setLastName(value)} />
          <Input outline={true} value={emailAddress} placeholder="Email" onChangeText={(value) => setEmailAddress(value)} />
          <PasswordInput outline={true} password={password} setPassword={setPassword} />

          <ContainerButtons>
            <Button title="Cadastrar" onPress={onSignUpPress} />
          </ContainerButtons>
        </>
      )}
      {pendingVerification && (
        <>
          <Input outline={true} value={code} placeholder="Código de verificação" onChangeText={(value) => setCode(value)} />
          <ContainerButtons>
            <Button title="Verificar" onPress={onPressVerify} />
          </ContainerButtons>
        </>
      )}
    </Container>
  );
}