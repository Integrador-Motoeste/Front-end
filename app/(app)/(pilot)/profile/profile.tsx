import React, { useContext, useState } from 'react';
import Header from '@/components/header';
import StarIcon from '@/assets/SVG/star-icon';
import SmallTextContent from '@/components/smallTextContent';
import BigTextContent from '@/components/bigTextContent';
import ExitButton from '@/components/exitButton';
import { Container, ContentProfile, InfoGrid, NameUser, ProfileImage, ProfileImageContainer, ProfileInfo, 
  ProfileSection, Rating, Title, TitleContext, ButtonContainer, WithdrawModalContainer, WithdrawContentContainer,
  CurrencyInputContainer, InstructionText, WithdrawButtons } from './style';
import { AuthContext } from '@/context/AuthContext';
import PixButton from '@/components/pixButton';
import { View, Modal } from 'react-native';
import InvoiceService from '@/app/services/invoices';
import { CustomCurrencyInput } from '@/components/currencyInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '@/components/Button';
import { ActivityIndicator } from 'react-native';
import CheckIcon from '@/assets/SVG/check';
import { to_br_real } from '@/components/utils/to-real';

export default function Profile() {
  const { user, userToken } = useContext(AuthContext);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const invoice_service  = new InvoiceService(userToken as string);
  const [withDrawValue, setWithDrawValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isFailed, setIsFailed] = useState(false);


  const cancelWithdraw = () => {
    setIsWithdrawModalVisible(false);
    setLoading(false);
    setWithDrawValue(0.0);
    setIsFailed(false);
    setIsFinished(false);
  }

  const withdraw = async () => {
    if(withDrawValue > 0){
      setLoading(true);
      const response = await invoice_service.withdraw(withDrawValue as number);
        if (response.status == 200){
          if (user) {
            user.balance = user.balance as number - withDrawValue as number;
          }
          setWithDrawValue(0.0);
          setIsFinished(true);
          setLoading(false);
        }else{
          setIsFailed(true);
          setLoading(false);
        }
    }
  }

  const profileImageUrl = user?.picture
    ? `${user.picture}`
    : "assets/images/icon.png";

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
          <BigTextContent label='Saldo' text={to_br_real(user?.balance)} />

            <Modal
              visible={isWithdrawModalVisible}
              onRequestClose={() => cancelWithdraw()}
              transparent={true}
            >
              <WithdrawModalContainer>
                <WithdrawContentContainer>
                  <InstructionText>
                    É necessário uma chave PIX com seu CPF ara realizar o saque
                  </InstructionText>

                  {loading ? (
                    <ActivityIndicator size="large" color="#1FD87F" />
                  ):(
                    isFinished ? (
                      <>
                        <CheckIcon width={72} height={72}/>
                      </>
                    ): isFailed ? (
                      <InstructionText>Falha ao realizar saque, tente novamente mais tarde</InstructionText>
                    ):(
                      <CurrencyInputContainer>
                        <CustomCurrencyInput
                          value={withDrawValue}
                          onChangeValue={(value) => value ? setWithDrawValue(value): {}}
                          maxValue={user?.balance as number}
                        />
                      </CurrencyInputContainer>
                    )
                  )}
                  <WithdrawButtons>
                    {!loading &&
                      isFinished ? (
                        <Button 
                        title="Voltar" 
                        onPress={cancelWithdraw}
                        buttonHeight='32px'
                        buttonWidth='80%'
                        />
                      ):(
                      <>
                        <Button 
                            margin="0px"
                            buttonHeight="32px" 
                            buttonColor="#D81F1F" 
                            buttonWidth="40%" 
                            title="Cancelar"
                            onPress={cancelWithdraw}
                        />
                        <Button
                            margin="0px"     
                            buttonHeight="32px" 
                            buttonWidth="40%" 
                            title="Sacar"
                            onPress={withdraw}
                        />
                      </>
                      )
                    }
                  </WithdrawButtons>
                </WithdrawContentContainer>
              </WithdrawModalContainer>
            </Modal>
            <InfoGrid>
              <SmallTextContent label='CPF' text={user?.cpf as string} />
              <SmallTextContent label='Email' text={user?.email as string} />
            </InfoGrid>
        </ContentProfile>
      </Container>
    </KeyboardAwareScrollView>
  );
}