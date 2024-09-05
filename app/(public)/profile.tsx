import styled from 'styled-components/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import UserIcon from '@/assets/SVG/user-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import InfoMotorcycle from '@/components/infoMotorcycle';

export default function Profile() {
  return (
    <Container>
      <Header>
        <Title>Meu Perfil</Title>
        <ProfileSection>
          <ProfileImageContainer>
            <UserIcon/>
            {/* <ProfileImage/> */}
          </ProfileImageContainer>
          <ProfileInfo>
            <Rating><StarIcon/> 5.0</Rating>
            <NameUser>Davy Eduardo Costa Dantassssss dasndadaçdamdpodadasldlçasdçlas,dçlkdmalskd</NameUser>
          </ProfileInfo>
        </ProfileSection>
      </Header>

      <ContentProfile>
        
          <BigTextContent label='Saldo' text='R$ 12,00'/>

        <InfoGrid>
          <SmallTextContent label='Telefone' text='(84) 98147-9999'/>
          <SmallTextContent label='CPF' text='123.456.789-10'/>
          <SmallTextContent label='Email' text='josesze@email.com'/>
          <SmallTextContent label='CNH' text='66602962477'/> 
        </InfoGrid>

        <VehicleCard>
          <InfoMotorcycle motorCycle={{image: '', brand: 'brand', model: 'model', year: 2021}}/>
        </VehicleCard>
      </ContentProfile>

    </Container>
  );
}

const ContentProfile = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 5% 0 5%;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 26px;
  text-align: left;
  font-family: "Inter_500Medium";
  width: 100%;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  height: 70px;
  width: 100%;
  gap: 10px;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #fff;
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
  right: 20%;
  margin: 0;
  padding: 0;
`;

const NameUser = styled.Text`
  color: white;
  font-size: 18px;
  font-family: "Inter_400Regular";
  width: 80%;
`;

const BalanceCard = styled.View`
  background-color: #F2F2F2;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const BalanceText = styled.Text`
  color: #1FD87F;
  font-size: 18px;
`;

const BalanceAmount = styled.Text`
  color: #1FD87F;
  font-size: 24px;
  font-weight: bold;
`;

const InfoGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

const InfoItem = styled.View`
  width: 48%;
  background-color: #1FD87F;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const InfoLabel = styled.Text`
  color: white;
  font-size: 14px;
`;

const InfoText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const VehicleCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  width: 100%;
`;

const VehicleIndicator = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #1FD87F;
  margin-right: 10px;
`;

const VehicleInfo = styled.Text`
  color: #1FD87F;
  font-size: 16px;
  font-weight: bold;
`;
