import { Container,ContainerButtons } from "../style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import { useState } from "react";


const [isLoading, setIsLoading] = useState(false);
const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const [rePassword, setRePassword] = useState('');
const [name, setName] = useState('');
const [lastName, setLastName] = useState('');

export default function SignUp() {
  return (
    <Container>

        <Input outline={true} placeholder="Nome" />
        <Input outline={true} placeholder="Sobrenome" />
        <Input outline={true} placeholder="Email" />
        <Input outline={true} placeholder="Senha" />
        <Input outline={true} placeholder="Confirmar Senha" />
        <ContainerButtons>
            <Button title="Cadastrar" />
            <ButtonOutLine
              isLoading={isLoading}
              onPress={() => {
                setIsLoading(true);
              }}
              icon="logo-google"
              title="Entrar com o Google"
            />
          </ContainerButtons>
    </Container>
  );
}