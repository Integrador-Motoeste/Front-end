import React, { useContext } from 'react';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import ExitButton from '@/components/exitButton';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileSection, Rating, Title, TitleContext} from './style';
import { AuthContext } from '@/context/AuthContext';
import ButtonOutLine from '@/components/ButtonOutLine';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const profileImageUrl = user?.picture
    ? `${user.picture}`
    : "assets/images/icon.png";

  return (
    <Container>
      <Header>
        <TitleContext>
        <Title>Meu Perfil</Title>
        <ExitButton/>
        </TitleContext>
        
        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: profileImageUrl }}/>
          </ProfileImageContainer>
          
          <ProfileInfo>
            <Rating><StarIcon/> 5.0</Rating>
            <NameUser>{user?.first_name} {user?.last_name}</NameUser>
          </ProfileInfo>
        </ProfileSection>
      </Header>

      <ContentProfile>
        <InfoGrid>
          <SmallTextContent label='CPF' text={user?.cpf as string}/>
          <SmallTextContent label='Email' text={user?.email as string}/>
        </InfoGrid>
        {user?.groups.includes(2) &&
        <ButtonOutLine 
        title="Trocar para Piloto" 
        onPress={() => {router.replace('/(app)/(pilot)')}}
        margin='20px'
        />}
      </ContentProfile>

      <Button buttonWidth='200px' buttonColor='#16aab4' title="Quero ser um piloto" onPress={() => {router.push('/(app)/(passenger)/profile/turnPilot')}}/>

    </Container>
  );
}
