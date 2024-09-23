import { View, Vibration } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {style} from "./styles"
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";
import { Notification } from "@/components/notifications/notification";
import { SearchingPop } from "@/components/searchingPopup";
import Button from "@/components/Button";
import { useLocalSearchParams } from "expo-router";
import { measure } from "react-native-reanimated";
import { router } from "expo-router";


import ridesService from "@/app/services/rides";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Ride } from "@/app/services/rides";


const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string

type props = {
    onRide: () => void;
}

export default function RidePassengerExecution(props: props){ 
    const { userToken, isLoading, user } = useContext(AuthContext);

    const rides_service = new ridesService(userToken as string);
    const [ride, setRide] = useState<Ride | null>(null);

    const mapRef = useRef<any>(null);

    const [pilotCoords, setPilotCoords] = useState<any>(null);
    const [isBoarded, setIsBoarded] = useState(false);

    const [socket, setSocket] = useState<any>(null);

    // BEGIN SOCKET

    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/rides/${ride?.id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }
        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type == 'finish_ride'){
                props.onRide();
                socket.close();
                router.replace(`/(passenger)/payments/${ride?.id}`)
            }else if (data.type == 'pilot_position'){
                setPilotCoords({
                    latitude: data.latitude,
                    longitude: data.longitude
                });
            }
        }
    }

    useEffect(() => {
        connectSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [ride])

    const confirm_boarding = () => {
        setIsBoarded(true);
        if (socket){
            const message = JSON.stringify({
                type: 'confirm_boarding',
                ride_id: ride?.id,
            })
            socket.send(message);
        }
    }

    //// END SOCKET


    const fetchRide = async () => {
        const response = await rides_service.get_active_ride();
        if (response && response.status === 200) {
          setRide(response.data);
          setIsBoarded(response.data.is_boarded);
        }
    }

    useEffect(() => {
        fetchRide();
    }, [])


    useEffect(() => {
        if (ride && pilotCoords) {
            if(isBoarded){
                if(mapRef.current){
                    setTimeout(() => {
                        mapRef.current.fitToSuppliedMarkers(["pilot", "destination"], {
                            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                        });
                    }, 0);
                }
            }else{
                setTimeout(() => {
                    if(mapRef.current){
                        mapRef.current.fitToSuppliedMarkers(["pilot", "origin"], {
                            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                        });
                    }
                }, 0);
            }
        }
    }, [[ride, pilotCoords]]);
    
    return (
        <View style={style.container}>
            {ride && (
                <View style={style.mapContainer}>
                    <MapView
                        ref={mapRef}
                        style={style.map}
                        initialRegion={{
                            latitude: ride?.start_lat as number,
                            longitude: ride?.start_lng as number,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: ride?.start_lat as number,
                                longitude: ride?.start_lng as number,
                            }}
                            identifier="origin"
                            title="Origem"
                        ></Marker>
                        <Marker
                            coordinate={{
                                latitude: ride?.end_lat as number,
                                longitude: ride?.end_lng as number,
                            }}
                            identifier="destination"
                            title="Destino"
                            pinColor="#1FD87F"
                        ></Marker>
                        {pilotCoords && (
                            <Marker
                                coordinate={{
                                    latitude: pilotCoords.latitude,
                                    longitude: pilotCoords.longitude,
                                }}
                                identifier="pilot"
                                title="Piloto"
                                pinColor="#F0E822"
                            ></Marker>
                        )}

                        {ride && (
                            pilotCoords ? (
                                isBoarded ? (
                                    <MapViewDirections
                                        origin={{
                                            latitude: pilotCoords.latitude,
                                            longitude: pilotCoords.longitude,
                                        }}
                                        destination={{
                                            latitude: ride?.end_lat as number,
                                            longitude: ride?.end_lng as number,
                                        }}
                                        apikey={google_key}
                                        strokeWidth={5}
                                        strokeColor="blue"
                                    />
                                ):(
                                    <MapViewDirections
                                        origin={{
                                            latitude: pilotCoords.latitude,
                                            longitude: pilotCoords.longitude,
                                        }}
                                        destination={{
                                            latitude: ride?.start_lat as number,
                                            longitude: ride?.start_lng as number,
                                        }}
                                        apikey={google_key}
                                        strokeWidth={5}
                                        strokeColor="blue"
                                    />
                                )
                            ):(
                                <MapViewDirections
                                    origin={{
                                        latitude: ride.start_lat as number,
                                        longitude: ride.start_lng as number,
                                    }}
                                    destination={{
                                        latitude: ride?.end_lat as number,
                                        longitude: ride?.end_lng as number,
                                    }}
                                    apikey={google_key}
                                    strokeWidth={5}
                                    strokeColor="blue"
                                />
                            )
                        )}
                    </MapView>
                </View>
            )}
            {!isBoarded && (
                <Button onPress={confirm_boarding} title="Confirmar embarque"></Button>
            )}

        </View>
    );
}