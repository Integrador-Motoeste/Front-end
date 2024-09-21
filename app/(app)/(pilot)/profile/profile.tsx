import React, { useContext } from 'react';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import ExitButton from '@/components/exitButton';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileSection, Rating, Title, TitleContext
  , ButtonContainer, WithdrawContainer, CurrencyInputContainer
} from './style';
import { AuthContext } from '@/context/AuthContext';
import PixButton from '@/components/pixButton';
import { View } from 'react-native';
import { useState } from 'react';
import InvoiceService from '@/app/services/invoices';
import { CustomCurrencyInput } from '@/components/currencyInput';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';



export default function Profile() {
  const { user, userToken } = useContext(AuthContext);
  const baseURL = 'http://192.168.0.16:8000';
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const invoice_service  = new InvoiceService(userToken as string);
  const [withDrawValue, setWithDrawValue] = useState<number|null>(0.0);

  const profileImageUrl = user?.picture
    ? `${user.picture}`
    : "assets/images/icon.png";

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Container>
      <Header>
        <TitleContext>
        <Title>Meu Perfil</Title>
        <ButtonContainer>
          <PixButton onPress={() => {setIsWithdrawModalVisible(true)}}/>
          <ExitButton/>
        </ButtonContainer>
        </TitleContext>
        
        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: profileImageUrl }}/>
          </ProfileImageContainer>
          
          <ProfileInfo>
            <NameUser>{user?.first_name} {user?.last_name}</NameUser>
          </ProfileInfo>
        </ProfileSection>
      </Header>

          <ContentProfile>
            <BigTextContent label='Saldo' text={String(user?.balance)} />

            {isWithdrawModalVisible ? (
              <WithdrawContainer>
                <CurrencyInputContainer>
                  <CustomCurrencyInput
                    value={withDrawValue}
                    onChangeValue={setWithDrawValue}
                  />
                </CurrencyInputContainer>
              </WithdrawContainer>
            ) : (
              <InfoGrid>
                <SmallTextContent label='CPF' text={user?.cpf as string} />
                <SmallTextContent label='Email' text={user?.email as string} />
              </InfoGrid>
            )}
          </ContentProfile>
    </Container>
        </ScrollView>
      </KeyboardAvoidingView>
  );
}
