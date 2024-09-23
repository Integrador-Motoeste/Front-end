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
import { router, useLocalSearchParams } from "expo-router";
import { measure } from "react-native-reanimated";

import ridesService from "@/app/services/rides";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Ride } from "@/app/services/rides";

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string

type props = {
    onRide: () => void;
}

export default function RidePilotExecution(props: props){ 
    const { userToken, isLoading, user } = useContext(AuthContext);

    const rides_service = new ridesService(userToken as string);
    const [ride, setRide] = useState<Ride | null>(null);

    const mapRef = useRef<any>(null);

    const [position, setPosition] = useState<any>(null)
    const [isBoarded, setIsBoarded] = useState(false);
    const isMounted = useRef(true);
    const [socket, setSocket] = useState<any>(null);

    // BEGIN SOCKET

    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/rides/${ride?.id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }

        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type === 'confirm_boarding'){
                setIsBoarded(true);
            }
            else if (data.type == 'finish_ride'){
                socket.close();
                props.onRide();
                router.replace(`/(pilot)/payments/${ride?.id}`)
            }
        }
    }

    useEffect(() => {
        if (socket && position && ride) {
            socket.send(JSON.stringify({
                type: 'change_pilot_position',
                ride_id: ride?.id,
                latitude: position.latitude,
                longitude: position.longitude,
                destination: {lat: ride?.end_lat, lng: ride?.end_lng},
            }));
        }
    }, [position]);

    useEffect(() => {
        connectSocket(); 
    
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [ride]); 

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
        if (ride && position && user) {
            if(isBoarded){
                setTimeout(() => {
                    if(mapRef.current){
                        mapRef.current.fitToSuppliedMarkers(["pilot", "destination"], {
                            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                        });
                    }
                }, 0);
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
    }, [[ride, position]]);

    useEffect(() => {
        const watchPosition = async () => {
            await watchPositionAsync(
                {
                    accuracy: LocationAccuracy.Highest,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (location) => {
                    const newPosition = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    setPosition(newPosition); 
                }
            );
        };
        watchPosition();

        return () => {
            isMounted.current = false;
        };
    }, []); 
    
    
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
                                latitude: ride.end_lat as number,
                                longitude: ride.end_lng as number,
                            }}
                            identifier="destination"
                            title="Destino"
                            pinColor="#1FD87F"
                        ></Marker>
                        {position && (
                            <Marker
                                coordinate={{
                                    latitude: position.latitude,
                                    longitude: position.longitude,
                                }}
                                identifier="pilot"
                                title="Localização Atual"
                                pinColor="#F0E822"
                            ></Marker>
                        )}

                        {ride && position && (
                            isBoarded ? (
                                <MapViewDirections
                                origin={{
                                    latitude: position.latitude,
                                    longitude: position.longitude,
                                }}
                                destination={{
                                    latitude: ride.end_lat as number,
                                    longitude: ride.end_lng as number,
                                }}
                                apikey={google_key}
                                strokeWidth={5}
                                strokeColor="blue"
                                />
                            ):(
                                <MapViewDirections
                                    origin={{
                                        latitude: position.latitude,
                                        longitude: position.longitude,
                                    }}
                                    destination={{
                                        latitude: ride.start_lat as number,
                                        longitude: ride.start_lng as number,
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

        </View>
    );
}