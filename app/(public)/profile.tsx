import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <Container>
      <Header>
        <Title>Meu Perfil</Title>
        <ProfileSection>
          <ProfileImage source={{ uri: 'https://via.placeholder.com/150' }} />
          <ProfileInfo>
            <Rating>⭐ 5.0</Rating>
            <Name>Davy Eduardo Costa Dantas</Name>
          </ProfileInfo>
        </ProfileSection>
      </Header>

      <BalanceCard>
        <BalanceText>Saldo</BalanceText>
        <BalanceAmount>R$ 12,34</BalanceAmount>
      </BalanceCard>

      <InfoGrid>
        <InfoItem>
          <InfoLabel>Telefone</InfoLabel>
          <InfoText>(12) 34567-8910</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoLabel>CPF</InfoLabel>
          <InfoText>123.456.789-10</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Email</InfoLabel>
          <InfoText>josesze@email.com</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoLabel>CNH</InfoLabel>
          <InfoText>66602962477</InfoText>
        </InfoItem>
      </InfoGrid>

      <VehicleCard>
        <VehicleIndicator />
        <VehicleInfo>Honda CG Titan 160 2023</VehicleInfo>
      </VehicleCard>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const Header = styled.View`
  background-color: #1FD87F;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  margin-right: 10px;
`;

const ProfileInfo = styled.View``;

const Rating = styled.Text`
  color: white;
  font-size: 16px;
`;

const Name = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
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
  background-color: #F2F2F2;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
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
