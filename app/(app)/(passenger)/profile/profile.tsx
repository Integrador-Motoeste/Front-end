import React, { useContext, useState, useEffect } from 'react';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import ExitButton from '@/components/exitButton';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileSection, Rating, Title, TitleContext } from './style';
import { AuthContext } from '@/context/AuthContext';
import { RatingService } from '@/app/services/rating';

export default function Profile() {
  const { user, userToken } = useContext(AuthContext);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    if (user && userToken) {
      const ratingService = new RatingService(userToken);
      
      ratingService.getAverageRating(user.id).then((data) => {
        setAverageRating(data.average_rating);
      });
    }
  }, [user, userToken]);

  const profileImageUrl = user?.picture
    ? `${user.picture}`
    : "assets/images/icon.png";

  return (
    <Container>
      <Header>
        <TitleContext>
          <Title>Meu Perfil</Title>
          <ExitButton />
        </TitleContext>

        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: profileImageUrl }} />
          </ProfileImageContainer>

          <ProfileInfo>
            <Rating><StarIcon /> {averageRating ? averageRating.toFixed(2) : "0"}</Rating>
            <NameUser>{user?.first_name} {user?.last_name}</NameUser>
          </ProfileInfo>
        </ProfileSection>
      </Header>

      <ContentProfile>
        <BigTextContent label='Saldo' text={String(user?.balance)} />

        <InfoGrid>
          <SmallTextContent label='CPF' text={user?.cpf as string} />
          <SmallTextContent label='Email' text={user?.email as string} />
        </InfoGrid>
      </ContentProfile>
    </Container>
  );
}
