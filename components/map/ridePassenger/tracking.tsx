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

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string


const temp_origin = {
    latitude : -6.0882835,
    longitude: -38.372192,
}


const temp_destination = {
    lat : -6.112170799999999,
    lng: -38.2065018,
}


export default function RidePassengerExecution() {
    const [id, setId] = useState<any>(5);

    const [origin, setOrigin] = useState<any>(null)
    const [destination, setDestination] = useState<any>(null)
    const mapRef = useRef<any>(null);

    const [pilotCoords, setPilotCoords] = useState<any>(null);
    const [isBoarded, setIsBoarded] = useState(false);

    const [socket, setSocket] = useState<any>(null);

    // BEGIN SOCKET

    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/rides/${id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }
        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type == 'finish_ride'){
                router.replace('/(passenger)/payments/5')
            }
            else if (data.type == 'pilot_position'){
                setPilotCoords({
                    latitude: data.latitude,
                    longitude: data.longitude
                });
            }
        }
    }

    useEffect(() => {
        connectSocket();
        setOrigin(temp_origin);
        setDestination(temp_destination);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [])

    const confirm_boarding = () => {
        setIsBoarded(true);
        if (socket){
            const message = JSON.stringify({
                type: 'confirm_boarding',
                ride_id: id,
            })
            socket.send(message);
        }
    }

    //// END SOCKET


    useEffect(() => {
        if (origin && destination && pilotCoords) {
            if(isBoarded){
                setTimeout(() => {
                    mapRef.current.fitToSuppliedMarkers(["pilot", "destination"], {
                        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    });
                }, 0);
            }else{
                setTimeout(() => {
                    mapRef.current.fitToSuppliedMarkers(["pilot", "origin"], {
                        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    });
                }, 0);
            }
        }
    }, [[origin, destination, pilotCoords]]);
    
    return (
        <View style={style.container}>
            {origin && (
                <View style={style.mapContainer}>
                    <MapView
                        ref={mapRef}
                        style={style.map}
                        initialRegion={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: origin.latitude,
                                longitude: origin.longitude,
                            }}
                            identifier="origin"
                            title="Origem"
                        ></Marker>
                        {destination && (
                            <Marker
                                coordinate={{
                                    latitude: destination.lat,
                                    longitude: destination.lng,
                                }}
                                identifier="destination"
                                title="Destino"
                                pinColor="#1FD87F"
                            ></Marker>
                        )}
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

                        {origin && destination && (
                            <MapViewDirections
                                origin={{
                                    latitude: origin.latitude,
                                    longitude: origin.longitude,
                                }}
                                destination={{
                                    latitude: destination.lat,
                                    longitude: destination.lng,
                                }}
                                apikey={google_key}
                                strokeWidth={5}
                                strokeColor="blue"
                            />
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