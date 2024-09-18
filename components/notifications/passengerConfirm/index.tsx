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
import { useState } from "react";
import UserService from "@/app/services/user";
interface pilotProps {
    accept: () => void;
    decline: () => void;
    pilotId: number;
    token: string;
}

const base_url = process.env.EXPO_PUBLIC_BACKEND_URL as string


export function PassengerNotification(props : pilotProps) {
    const [pilot, setPilot] = useState<any>(null);
    const user_service = new UserService(props.token);

    const fetchPilot = async () => {
        const response = await user_service.get_pilot(props.pilotId);
        console.log(response.data);
        if (response && response.status === 200){
            setPilot(response.data);
        }
    } 

    useEffect(() => {
        fetchPilot();
    }, [])

    return (
        <Modal
            visible={true}
            transparent={true}
            animationType="slide"
            onRequestClose={props.decline}
        >
            <ModalContainer>
                <ModalContent>
                <Icon>
                    <MotoIcon width={86} height={86}/>
                </Icon>
                    {pilot && (
                        <>
                        
                            <ProfileMainContainer>
                                <ProfileContainer>
                                    <ProfileInfoContainer>
                                        <ProfileImg source={{uri: pilot.user.picture}}/>
                                        <ProfileName>{truncateName(pilot.user.first_name, 20)}</ProfileName>
                                    </ProfileInfoContainer>
                                </ProfileContainer>
                            </ProfileMainContainer>
                            <VehicleContainer>
                                <BadgeContainer>
                                    <VehicleLeftInfoContainer>
                                        <PlateIcon/>
                                        <VehicleInfoText>{pilot.motorcycle.plate}</VehicleInfoText>
                                    </VehicleLeftInfoContainer>
                                    <VehicleRightInfoContainer>
                                        <CalendarIcon/>
                                        <VehicleInfoText>{pilot.motorcycle.year}</VehicleInfoText>
                                    </VehicleRightInfoContainer>
                                </BadgeContainer>
                                <VehicleImageContainer>
                                    <ProfileImg source={{uri: `${base_url}${pilot.motorcycle.picture_moto}`}}/>
                                    <VehicleMainInfoContainer>
                                        <VehicleName>{truncateName(`${pilot.motorcycle.brand} ${pilot.motorcycle.model}`, 20)}</VehicleName>
                                        <VehicleColor>{pilot.motorcycle.color}</VehicleColor>
                                    </VehicleMainInfoContainer>
                                </VehicleImageContainer>
                            </VehicleContainer>
                        </>
                    )}

                    <ButtonContainer>
                        <Button 
                            margin="0px"
                            buttonHeight="32px" 
                            buttonColor="#D81F1F" 
                            buttonWidth="40%" 
                            title="Recusar"
                            onPress={props.decline}
                        />
                        <Button
                            margin="0px"     
                            buttonHeight="32px" 
                            buttonWidth="40%" 
                            title="Aceitar"
                            onPress={props.accept}
                        />
                    </ButtonContainer>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}