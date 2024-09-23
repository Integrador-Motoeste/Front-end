import { Container, ContainerButtons } from "./style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import ButtonOutLine from '@/components/ButtonOutLine';
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import PasswordInput from '@/components/PasswordInput';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

export default function SignUp() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const { signUp } = useContext(AuthContext);

  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <Container>
        <Input outline={true} value={name} placeholder="Nome" onChangeText={(value) => setName(value)} />
        <Input outline={true} value={lastName} placeholder="Sobrenome" onChangeText={(value) => setLastName(value)} />
        <Input outline={true} value={emailAddress} placeholder="Email" onChangeText={(value) => setEmailAddress(value)} />
        <Input outline={true} value={cpf} placeholder="CPF" onChangeText={(value) => setCpf(value)} />
        <PasswordInput outline={true} password={password} setPassword={setPassword}></PasswordInput>
        <PasswordInput outline={true} password={rePassword} setPassword={setRePassword}></PasswordInput>
        <Button title="Escolher imagem da galeria" onPress={pickImage}/>
        {image ? (
          <Image
            source={{ uri: image as string }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : null}
        <ContainerButtons>
          <Button title="Cadastrar" onPress={() => {
            signUp(emailAddress, password, rePassword, name, lastName, cpf, image);
          }} />
        </ContainerButtons>
      </Container>
    </KeyboardAwareScrollView>
  );
}