import { View, Vibration } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { style } from "./styles";
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";
import { Notification } from "@/components/notifications/notification";
import { io } from "socket.io-client";
import { SearchingPop } from "@/components/searchingPopup";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string
const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string


interface MapProps {
    onRide: () => void;
}

export default function Map({onRide}: MapProps) {
    const { userToken, isLoading, user } = useContext(AuthContext);
    const [origin, setOrigin] = useState<any>(null)
    const [destination, setDestination] = useState<any>(null)
    const [position, setPosition] = useState<any>(null)

    const mapRef = useRef<any>(null);

    const [distance, setDistance] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [price, setPrice] = useState<number>(0);


    const [socket, setSocket] = useState<any>(null);
    const [passengerId, setPassengerId] = useState<any>(null);
    const [hasRide, setHasRide] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

    // BEGIN SOCKET

    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/rides_queue/${user?.id}/pilot/`)

        socket.onopen = () => {
            setSocket(socket);

            const message = JSON.stringify({
                type: "update_coords",
                coords: {
                    latitude: position.latitude,
                    longitude: position.longitude
                },
                user_type : 'pilot',
                user_id: user?.id,
            });

            socket.send(message)
        }

        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type === 'ride_request') {
                if (hasRide === false){

                    Vibration.vibrate(1000)
                    setPassengerId(data.passenger_id);

                    setOrigin(data.origin);
                    setDestination(data.destination);

                    setDistance(data.info.distance);
                    setPrice(data.info.price);
                    setDuration(data.info.duration);
                    
                    setHasRide(true);
                }
            }
            if (data.type === 'pilot_confirmed') {
                if (data.response === false){
                    setHasRide(false);
                    setAwaitingConfirmation(false);
                    setIsSearching(true);
                    setPassengerId(null);
                }else if (data.response === true){
                    socket.close();
                    onRide();
                }
            }
            if (data.type == 'passenger_not_found'){
                setHasRide(false);
                setAwaitingConfirmation(false);
                setIsSearching(true);
                setPassengerId(null);
            }
        }

        setIsSearching(true);
        setSocket(socket);
    }

    const remove_coords = async () => {
        const message = JSON.stringify({
            type: "remove_coords",
            user_id: user?.id,
            user_type: 'pilot',
        });

        await socket.send(message)
    }

    const acceptRide = () => {
        if (socket) {
            const message = JSON.stringify({
                type: "respond_ride",
                pilot_id: user?.id,
                passenger_id: passengerId,
                response: true
            });
            socket.send(message);
            setHasRide(false);
            setAwaitingConfirmation(true);
            setIsSearching(false);
        }
    }

    const declineRide = () => {
        if (socket) {
            const message = JSON.stringify({
                type: "respond_ride",
                pilot_id: user?.id,
                passenger_id: passengerId,
                response: false
            });
            socket.send(message);
            setHasRide(false);
        }
    }

    const cancelSearching = () => {
        if (socket) {
            remove_coords();
            socket.close();
            setIsSearching(false);
            setAwaitingConfirmation(false);
            setPassengerId(null);
        }
    }


    //// END SOCKET

    async function requestLocalPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setPosition({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            });
        }
    }

    useEffect(() => {
        requestLocalPermissions();

        return () => {
            if (socket) {
                remove_coords();
                socket.close();
            }
        };
    }, [])

    useEffect(() => {
        watchPositionAsync(
            {
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 10,
            },
            (location) => {
                setPosition({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        );
    }, []);
    
    
    return (
        <View style={style.container}>


        { position && 
            <View style={style.mapContainer}>
                <MapView
                ref={mapRef} 
                style={style.map}
                initialRegion={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                accessibilityElementsHidden={false}
                >
                    <Marker
                    coordinate={{
                        latitude: position.latitude,
                        longitude: position.longitude
                    }}
                    identifier="origin"
                    title="Origem"
                    >
                    </Marker>
                </MapView>
            </View>
        }
            
            {isSearching ? (
                hasRide ? (
                    <Notification
                        accept={acceptRide}
                        decline={declineRide}
                        origin={origin}
                        destination={destination}
                        position={position}
                        value={price}
                        duration={duration}
                        distance={distance}
                        passenger_id={passengerId}
                        token={userToken as string}
                    ></Notification>
                ) : (
                    <SearchingPop
                        onCancel={cancelSearching}
                        visible={isSearching}
                        message="Procurando Corridas"
                    ></SearchingPop>
                )
            ) : awaitingConfirmation ? (
                <SearchingPop
                hasButton={false}
                visible={awaitingConfirmation}
                message="Esperando Confirmação"
                ></SearchingPop>
            ) : (
                <Button onPress={connectSocket} title="Procurar Corrida"></Button>
            )}
        </View>
    );
}