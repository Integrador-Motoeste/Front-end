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
import GoogleMapsService from "@/app/services/google";
import { useState } from "react";


interface pilotProps {
    accept: () => void;
    decline: () => void;
    origin: {
        latitude: number;
        longitude: number;
    };
    destination: {
        latitude: number;
        longitude: number;
    };
    position: {};
    value: string | number;
    duration: string;
    distance: string;
    passenger_id : number;
}



export function Notification(pilotProps: pilotProps) {

    const service = new GoogleMapsService();
    const [origin, setOrigin] = useState<any>(null);
    const [destination, setDestination] = useState<any>(null);

    const fecthPlaces = async () => {
        const origin_name = await service.getPlaceFromCoordinates(pilotProps.origin.latitude, pilotProps.origin.longitude)
        const destination_name = await service.getPlaceFromCoordinates(pilotProps.destination.latitude, pilotProps.destination.longitude)
        
        setOrigin(origin_name);
        setDestination(destination_name);
    }


    useEffect(() => {
        fecthPlaces();
    }, []);


    return (
        <Modal
            visible={true}
            transparent={true}
            animationType="slide"
            onRequestClose={pilotProps.decline}
        >
            <ModalContainer>
                <ModalContent>
                <Icon>
                    <MotoIcon width={86} height={86}/>
                </Icon>
                        {origin && destination && (
                            <PlacesContainer>
                                <Place>{truncateName(origin, 60)}</Place>
                                <ArrowIcon width={32} height={32}/>
                                <Place>{truncateName(destination, 60)}</Place>
                            </PlacesContainer>
                        )}
                    <ProfileMainContainer>
                        <BadgeContainer>
                            <Badge value={pilotProps.distance}/>
                            <Badge value={pilotProps.duration}/>
                            <Badge color={"#34C17D"} value={pilotProps.value}/>
                        </BadgeContainer>
                        <ProfileContainer>
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
                            onPress={pilotProps.decline}
                        />
                        <Button
                            margin="0px"     
                            buttonHeight="32px" 
                            buttonWidth="40%" 
                            title="Aceitar"
                            onPress={pilotProps.accept}
                        />
                    </ButtonContainer>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}