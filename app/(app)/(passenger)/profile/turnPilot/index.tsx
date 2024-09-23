import { Container, ContainerButtons } from "./style";
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

export default function TurnPilot() {
  const [cnh, setCnh] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setcolor] = useState('');
  const [plate, setPlate] = useState('');
  const [image, setImage] = useState<string>();
  const [data, setData] = useState<any>({});

  const { turnPilot, user } = useContext(AuthContext);

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

  const TurnPilot = () => {
    const pilot = {
      cnh: cnh,
    }
    const motorcycle = {
      model: model,
      year: year,
      plate: plate,
      color: color,
      brand: brand,
      onwer: user?.id,
      picture: image
    }
    const data = {
      pilot: pilot,
      motorcycle: motorcycle
    }
    turnPilot(data);
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <Container>
        <Input outline={true} value={cnh} placeholder="CNH" onChangeText={(value) => setCnh(value)} />
        <Input outline={true} value={brand} placeholder="Marca" onChangeText={(value) => setBrand(value)} />
        <Input outline={true} value={model} placeholder="Modelo" onChangeText={(value) => setModel(value)} />
        <Input outline={true} value={year} placeholder="Ano" onChangeText={(value) => setYear(value)} />
        <Input outline={true} value={color} placeholder="Cor" onChangeText={(value) => setcolor(value)} />
        <Input outline={true} value={plate} placeholder="Placa" onChangeText={(value) => setPlate(value)} />
        <Button title="Escolher imagem da galeria" onPress={pickImage}/>
        {image ? (
          <Image
            source={{ uri: image as string }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : null}
        <ContainerButtons>
          <Button title="Cadastrar" onPress={() => {
            TurnPilot();
          }} />
        </ContainerButtons>
      </Container>
    </KeyboardAwareScrollView>
  );
}