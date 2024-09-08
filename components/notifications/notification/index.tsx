import { View, Text, Modal } from "react-native";
import { Container, Icon, Place, PlacesContainer, BadgeContainer,
    ProfileContainer, ProfileName, StarContainer, StarNumber,
    ProfileInfoContainer, StarImg, ProfileImg, ButtonContainer,
    ProfileMainContainer
 } from "./styles";
import { useEffect } from 'react';
import Badge from "../../badge/badge";
import Button from "../../Button";
import MotoIcon from "@/assets/SVG/moto";
import ArrowIcon from "@/assets/SVG/arrow";
import { ModalContainer, ModalContent } from "./styles";
import { truncateName } from "@/components/utils/truncate-text";


interface pilotProps {
    accept: () => void;
    decline: () => void;
}

export function Notification({accept, decline}: pilotProps) {
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
                    <PlacesContainer>
                        <Place>{truncateName('Rua Princesa Isabel', 80)}</Place>
                        <ArrowIcon width={32} height={32}/>
                        <Place>{truncateName('Avenida 13 de Maio', 80)}</Place>
                    </PlacesContainer>
                    <ProfileMainContainer>
                        <BadgeContainer>
                            <Badge value="8,7 Km"/>
                            <Badge value="20 min"/>
                            <Badge color={"#34C17D"} value="R$ 10,00"/>
                        </BadgeContainer>
                        <ProfileContainer>
                            <StarContainer>
                                <StarImg source={require('../../../assets/images/notification/star.png')}/>
                                <StarNumber>4.5</StarNumber>
                            </StarContainer>
                            <ProfileInfoContainer>
                                <ProfileImg source={require('../../../assets/images/notification/profile.png')}/>
                                <ProfileName>{truncateName('Joao pedro', 80)}</ProfileName>
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