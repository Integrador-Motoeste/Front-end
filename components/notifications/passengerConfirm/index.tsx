import { View, Text, Modal } from "react-native";
import { Container, Icon, Place, PlacesContainer, BadgeContainer,
    ProfileContainer, ProfileName, StarContainer, StarNumber,
    ProfileInfoContainer, StarImg, ProfileImg, ButtonContainer,
    ProfileMainContainer, VehicleLeftInfoContainer, VehicleInfoText,
    VehicleContainer, VehicleImageContainer, VehicleRightInfoContainer,
    VehicleMainInfoContainer, VehicleName, VehicleColor
 } from "./styles";
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Badge from "../../badge/badge";
import Button from "../../Button";
import MotoIcon from "@/assets/SVG/moto";
import ArrowIcon from "@/assets/SVG/arrow";
import { ModalContainer, ModalContent } from "./styles";
import { truncateName } from "@/components/utils/truncate-text";
import CalendarIcon from "@/assets/SVG/calendar";
import PlateIcon from "@/assets/SVG/plate";

interface pilotProps {
    accept: () => void;
    decline: () => void;
}

export function PassengerNotification({accept, decline}: pilotProps) {
    return (
        <Modal
            visible={true}
            transparent={true}
            animationType="slide"
            onRequestClose={decline}
        >
            <ModalContainer>
                <ModalContent>
                <Icon>
                    <MotoIcon width={86} height={86}/>
                </Icon>
                    <ProfileMainContainer>
                        <ProfileContainer>
                            <StarContainer>
                                <StarImg source={require('../../../assets/images/notification/star.png')}/>
                                <StarNumber>4.5</StarNumber>
                            </StarContainer>
                            <ProfileInfoContainer>
                                <ProfileImg source={require('../../../assets/images/notification/profile.png')}/>
                                <ProfileName>{truncateName('Joao pedro', 20)}</ProfileName>
                            </ProfileInfoContainer>
                        </ProfileContainer>
                    </ProfileMainContainer>
                    <VehicleContainer>
                        <BadgeContainer>
                            <VehicleLeftInfoContainer>
                                <PlateIcon/>
                                <VehicleInfoText>ABCD1234</VehicleInfoText>
                            </VehicleLeftInfoContainer>
                            <VehicleRightInfoContainer>
                                <CalendarIcon/>
                                <VehicleInfoText>2012</VehicleInfoText>
                            </VehicleRightInfoContainer>
                        </BadgeContainer>
                        <VehicleImageContainer>
                            <MotoIcon width={50} height={50}/>
                            <VehicleMainInfoContainer>
                                <VehicleName>{truncateName('Honda Biz 125', 20)}</VehicleName>
                                <VehicleColor>Cor Amarela</VehicleColor>
                            </VehicleMainInfoContainer>
                        </VehicleImageContainer>
                    </VehicleContainer>
                    <ButtonContainer>
                        <Button 
                            margin="0px"
                            buttonHeight="32px" 
                            buttonColor="#D81F1F" 
                            buttonWidth="40%" 
                            title="Recusar"
                            onPress={decline}
                        />
                        <Button
                            margin="0px"     
                            buttonHeight="32px" 
                            buttonWidth="40%" 
                            title="Aceitar"
                            onPress={accept}
                        />
                    </ButtonContainer>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}