import { Container,ContainerButtons } from "./style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import PasswordInput from '@/components/PasswordInput';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signUp } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <Container>

          <Input outline={true} value={name} placeholder="Nome" onChangeText={(value) => setName(value)}/>
          <Input outline={true} value={lastName} placeholder="Sobrenome" onChangeText={(value) => setLastName(value)} />
          <Input outline={true} value={emailAddress} placeholder="Email" onChangeText={(value) => setEmailAddress(value)} />
          <PasswordInput outline={true} password={password} setPassword={setPassword}></PasswordInput>
          <PasswordInput outline={true} password={rePassword} setPassword={setRePassword}></PasswordInput>

          <ContainerButtons>
              <Button title="Cadastrar" onPress={() => {
                  signUp(emailAddress, password, rePassword, name, lastName);
                }} />
              <ButtonOutLine
                isLoading={isLoading}
                onPress={() => {
                  signUp(emailAddress, password, rePassword, name, lastName);
                }}
                icon="logo-google"
                title="Cadastrar com o Google"
              />
            </ContainerButtons>
            
      </Container>
    </KeyboardAwareScrollView>
  );
}