import React from 'react';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import { useUser } from '@clerk/clerk-expo';
import ExitButton from '@/components/exitButton';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileSection, Rating, Title, TitleContext} from './style';


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
          <SmallTextContent label='Email' text={user.emailAddresses[0].emailAddress}/>
        </InfoGrid>

      </ContentProfile>

    </Container>
  );
}
