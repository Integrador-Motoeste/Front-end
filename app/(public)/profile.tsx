import styled from 'styled-components/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView} from 'react-native';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import UserIcon from '@/assets/SVG/user-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import InfoMotorcycle from '@/components/infoMotorcycle';
import { useUser } from '@clerk/clerk-expo';
import ExitButton from '@/components/exitButton';
import Button from '@/components/Button';

export default function Profile() {
  const { isSignedIn, user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(() => {
    if (user && user.phoneNumbers && user.phoneNumbers.length > 0) {
      return user.phoneNumbers[0].phoneNumber;
    }
    return 'Nenhum';
  });
  const [editedPhone, setEditedPhone] = useState(phone);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedPhone(phone);
    setIsEditing(false);
  };

  const handleSave = () => {
    setPhone(editedPhone);
    setIsEditing(false);
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ marginRight: 80 }}>
      <Header>
        <TitleContext>
          <Title>Meu Perfil</Title>
          <ExitButton />
        </TitleContext>

        <ProfileSection>
          <ProfileImageContainer>
            <UserIcon />
          </ProfileImageContainer>
          <ProfileInfo>
            <Rating><StarIcon /> 5.0</Rating>
            <NameUser>{user.firstName} {user.lastName}</NameUser>
          </ProfileInfo>
        </ProfileSection>
      </Header>

      <ContentProfile>
        <BigTextContent label="Saldo" text="R$ 12,00" />

        <InfoGrid>
        {isEditing ? (
            <PhoneBox>
              <PhoneText>Telefone</PhoneText>
              <PhoneInput
                value={editedPhone}
                onChangeText={setEditedPhone}
                keyboardType="phone-pad"
                selectionColor='black'
              />
            </PhoneBox> 
          ) : (
            <SmallTextContent label="Telefone" text={phone} />
          )}
          <SmallTextContent label="CPF" text="123.456.789-10" />
          <SmallTextContent label="Email" text={user.emailAddresses[0].emailAddress} />
          <SmallTextContent label="CNH" text="66602962477" />
        </InfoGrid>

        <VehicleCard>
          <InfoMotorcycle motorCycle={{ image: '', brand: 'brand', model: 'model', year: 2021 }} />
        </VehicleCard>
      </ContentProfile>
      <ButtonContainer>
          {isEditing ? (
            <>
              <StyledButton onPress={handleSave} title="Salvar" />
              <StyledCancelButton  onPress={handleCancel} title="Cancelar" />
            </>
          ) : (
            <StyledButton onPress={handleEdit} title="Editar" />
          )}
        </ButtonContainer>
        </ScrollView>
    </Container>
  );
}

const ContentProfile = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 5%;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  margin-Bottom: 90px;
  padding-top: 30px;
`;

const TitleContext = styled.View`
  justify-content: space-between;
  display: flex;
  align-items: baseline;
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 26px;
  font-family: "Inter_500Medium";
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  height: 70px;
  width: 100%;
  gap: 10px;
`;

const ProfileImageContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.View`
  height: 100%;
  width: 100%;
  align-items: left;
  justify-content: center;
`;

const Rating = styled.Text`
  color: white;
  font-size: 16px;
  position: absolute;
  top: -20%;
  right: 23%;
  margin: 0;
  padding: 0;
`;

const NameUser = styled.Text`
  color: white;
  font-size: 18px;
  font-family: "Inter_400Regular";
  width: 78%;
`;

const InfoGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

const VehicleCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  width: 100%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin-left: 10px;
`;

const PhoneInput = styled.TextInput`
  min-width: 180px;
  max-width: 80%;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  color: white;
  background-color: #1FD87F;
  border-width: 1.5px;
  border-style: solid;
  border-color: black;
`;

const PhoneBox = styled.View`
  min-width: 180px;
  max-width: 80%; 
`;

const PhoneText = styled.Text`
  color: #7d7d7d86;
  font-size: 15px;
  font-family: "Inter_700Bold";
  margin: 0;
`;

const StyledButton = styled(Button)`
  width: 25%;
`;

const StyledCancelButton = styled(StyledButton)`
  background-color: red;
`;
