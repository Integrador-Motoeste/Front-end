import { View, Text, Image } from "react-native";
import { Container, Icon, Place, PlacesContainer, BadgeContainer,
    ProfileContainer, ProfileName, StarContainer, StarNumber,
    ProfileInfoContainer, StarImg, ProfileImg, ButtonContainer,
    ProfileMainContainer
 } from "./styles";
import { Inter_600SemiBold, Inter_500Medium, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Badge from "../badge/badge";
import Button from "../Button";
import MotoIcon from "@/assets/SVG/moto";
import ArrowIcon from "@/assets/SVG/arrow";

SplashScreen.preventAutoHideAsync();
const truncateName = (name: string) => {
    if (name.length > 80) {
      return name.substring(0, 80) + '...';
    }
    return name;
};

export function Notification(){
    const [loaded, error] = useFonts({
        Inter_600SemiBold,
        Inter_500Medium,
        Inter_700Bold
    });

    useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    
    if (!loaded && !error) {
        return null;
    }

    return (
        <Container>
            <Icon>
                <MotoIcon width={86} height={86}/>
            </Icon>
            <PlacesContainer>
                <Place>{truncateName('Rua Princesa Isabel')}</Place>
                <ArrowIcon width={32} height={32}/>
                <Place>{truncateName('Avenida 13 de Maio')}</Place>
            </PlacesContainer>
            <ProfileMainContainer>
                <BadgeContainer>
                    <Badge value="8,7 Km"/>
                    <Badge value="20 min"/>
                    <Badge color={"#34C17D"} value="R$ 10,00"/>
                </BadgeContainer>
                <ProfileContainer>
                    <StarContainer>
                        <StarImg source={require('../../assets/images/notification/star.png')}/>
                        <StarNumber>4.5</StarNumber>
                    </StarContainer>
                    <ProfileInfoContainer>
                        <ProfileImg source={require('../../assets/images/notification/profile.png')}/>
                        <ProfileName>{truncateName('Joao pedro')}</ProfileName>
                    </ProfileInfoContainer>
                </ProfileContainer>
            </ProfileMainContainer>
            <ButtonContainer>
                <Button 
                    margin="0px"
                    buttonHeight="32px" 
                    buttonColor="#D81F1F" 
                    buttonWidth="40%" 
                    title="Recusar"
                />
                <Button
                    margin="0px"     
                    buttonHeight="32px" 
                    buttonWidth="40%" 
                    title="Aceitar"
                />
            </ButtonContainer>
        </Container>
    )
}