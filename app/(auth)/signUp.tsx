import { Container,ContainerButtons } from "./style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import { useState } from "react";


export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');


  return (
    <Container>

        <Input outline={true} value={name} placeholder="Nome" onChangeText={(value) => setName(value)}/>
        <Input outline={true} value={lastName} placeholder="Sobrenome" onChangeText={(value) => setLastName(value)} />
        <Input outline={true} value={emailAddress} placeholder="Email" onChangeText={(value) => setEmailAddress(value)} />
        <Input outline={true} value={password} placeholder="Senha" onChangeText={(value) => setPassword(value)} />
        <Input outline={true} value={rePassword} placeholder="Confirmar Senha" onChangeText={(value) => setRePassword(value)} />

        <ContainerButtons>
            <Button title="Cadastrar" />
            <ButtonOutLine
              isLoading={isLoading}
              onPress={() => {
                setIsLoading(true);
              }}
              icon="logo-google"
              title="Cadastrar com o Google"
            />
          </ContainerButtons>
          
    </Container>
  );
}