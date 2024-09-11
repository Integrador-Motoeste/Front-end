import React from 'react';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import { useUser } from '@clerk/clerk-expo';
import ExitButton from '@/components/exitButton';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileSection, Rating, Title, TitleContext} from './style';
import { useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '../storage/toekCache';
import { useEffect } from 'react';

export default function Profile() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  if(!isSignedIn) {
    return null;
  } 

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        try {
          // Obtenha o token de acesso
          const token = await getToken();
          console.log('Token de acesso:', token);
        } catch (error) {
          console.error('Erro ao obter o token de acesso:', error);
        }
      }
    };

    fetchToken();
  }, [isSignedIn]);
  
  console.log(user);
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
