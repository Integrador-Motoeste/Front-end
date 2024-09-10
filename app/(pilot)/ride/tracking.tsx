import { View, Vibration } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {style} from "./styles"
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";
import { Notification } from "@/components/notifications/notification";
import { io } from "socket.io-client";
import { SearchingPop } from "@/components/searchingPopup";
import Button from "@/components/Button";
import { useLocalSearchParams } from "expo-router";
import { measure } from "react-native-reanimated";

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string

const temp_origin = {
    latitude : -6.0882835,
    longitude: -38.372192,
}

const temp_destination = {
    lat : -6.112170799999999,
    lng: -38.3067149,
}


export default function RidePassengerExecution() {
    const [id, setId] = useState<any>(5);

    const [origin, setOrigin] = useState<any>(null)
    const [destination, setDestination] = useState<any>(null)
    const mapRef = useRef<any>(null);

    const [position, setPosition] = useState<any>(null)
    const [isBoarded, setIsBoarded] = useState(false);

    const [socket, setSocket] = useState<any>(null);

    // BEGIN SOCKET

    const connectSocket = () => {
        const socket = new WebSocket(`ws://192.168.0.9:8000/ws/rides/${id}/`)

        socket.onopen = () => {
            setSocket(socket);
            console.log('Socket connected');
        }

        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type === 'confirm_boarding'){
                setIsBoarded(true);
            }
        }
    }

    useEffect(() => {
        if (socket && position) {
            socket.send(JSON.stringify({
                type: 'change_pilot_position',
                ride_id: id,
                latitude: position.latitude,
                longitude: position.longitude
            }));
        }
    }, [position, socket]);

    useEffect(() => {
        connectSocket(); 
        setOrigin(temp_origin);
        setDestination(temp_destination);
    
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []); 

    //// END SOCKET

    useEffect(() => {
        if (origin && destination && position) {
            setTimeout(() => {
                mapRef.current.fitToSuppliedMarkers(["origin", "destination", "pilot"], {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                });
            }, 0);
        }
    }, [[origin, destination, position]]);

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
    }, []); 
    
    
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

                        {origin && destination && position && (
                            isBoarded ? (
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
                            ):(
                                <MapViewDirections
                                    origin={{
                                        latitude: position.latitude,
                                        longitude: position.longitude,
                                    }}
                                    destination={{
                                        latitude: origin.latitude,
                                        longitude: origin.longitude,
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