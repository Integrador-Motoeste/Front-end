import styled from 'styled-components/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import UserIcon from '@/assets/SVG/user-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import InfoMotorcycle from '@/components/infoMotorcycle';
import { useUser } from '@clerk/clerk-expo';
import ExitButton from '@/components/exitButton';
import { tokenCache } from '../storage/toekCache';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileSection, Rating, Title, TitleContext, VehicleCard} from './style';


export default function Profile() {
  const { isSignedIn, user } = useUser();
  
  if(!isSignedIn) {
    return null;
  } 
  
  console.log(user.publicMetadata);
  
  const baseURL = 'http://192.168.0.16:8000';

  const profileImageUrl = user?.publicMetadata.image_url
    ? `${baseURL}${user.publicMetadata.image_url}`
    : user.imageUrl;

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
            <NameUser>{user.firstName} {user.lastName}</NameUser>
          </ProfileInfo>
        </ProfileSection>
      </Header>

      <ContentProfile>
        
          <BigTextContent label='Saldo' text='R$ 12,00'/>

        <InfoGrid>
          <SmallTextContent label='CPF' text={user.publicMetadata.cpf as string}/>
          <SmallTextContent label='CNH' text={user.publicMetadata.cnh as string}/> 
          <SmallTextContent label='Email' text={user.emailAddresses[0].emailAddress}/>
        </InfoGrid>

        <VehicleCard>
          <InfoMotorcycle motorCycle={{image: '', brand: 'brand', model: 'model', year: 2021}}/>
        </VehicleCard>

      </ContentProfile>

    </Container>
  );
}


