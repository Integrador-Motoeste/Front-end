import { Container, ContainerButtons } from "../(auth)/style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useState } from "react";
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { Alert, ScrollView } from 'react-native';

export default function SignUp() {
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [crlv, setCrlv] = useState('');
  const [picture, setPicture] = useState<string | null>(null);


  const selectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri || null);
    }
  };

  return (
    <Container>
      <ScrollView>
      <PilotArea>
        <PilotText>Motorista</PilotText>
        <Input outline={true} value={cpf} placeholder="CPF" onChangeText={(value) => setCpf(value)} />
        <Input outline={true} value={cnh} placeholder="CNH" onChangeText={(value) => setCnh(value)} />
      </PilotArea>

      <MotorcyclesArea>
        <MotorcycleText>Veículo</MotorcycleText>
        <Input outline={true} value={model} placeholder="Modelo" onChangeText={(value) => setModel(value)} />
        <Input outline={true} value={brand} placeholder="Marca" onChangeText={(value) => setBrand(value)} />
        <Input outline={true} value={color} placeholder="Cor" onChangeText={(value) => setColor(value)} />
        <Input outline={true} value={year} placeholder="Ano" onChangeText={(value) => setYear(value)} />
        <Input outline={true} value={plate} placeholder="Placa" onChangeText={(value) => setPlate(value)} />
        <Input outline={true} value={crlv} placeholder="Crlv" onChangeText={(value) => setCrlv(value)} />

        <SelectPictury onPress={selectPicture}>
          <SelectText>{picture ? 'Trocar Foto' : 'Selecionar Foto'}</SelectText>
        </SelectPictury>

        {picture && <MotorcycleImage source={{ uri: picture }} style={{ width: 100, height: 100, marginTop: 10 }} />}

      </MotorcyclesArea>

      <ContainerButtons>
        <Button title="Cadastrar" />
        <CancelButton title="Cancelar" />
      </ContainerButtons>
    </ScrollView>
    </Container>
  );
}

const CancelButton = styled(Button)`
  background-color: red;
`;

const MotorcyclesArea = styled.View`
  margin-top: 5px;
`;

const MotorcycleText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  font-family: Inter_500Medium;
  color: #1FD87F;
`;

const PilotArea = styled.View`
  margin-top: 20px;
`;

const PilotText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  font-family: Inter_500Medium;
  color: #1FD87F;
`;

const SelectPictury = styled.TouchableOpacity`
  padding: 12px 6px;
  border-radius: 10px;
  margin: 10px;
  width: 297px;
  height: 47px;
  background-color: white;
  border-width: 2px;
  border-style: solid;
  border-color: #1FD87F;
`;

const SelectText = styled.Text`
  font-size: 16px;
  font-family: Inter_500Medium;
  color: #7d7d7d86;
`;

const MotorcycleImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-left: 15px;
`;
