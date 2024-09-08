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


const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string

const temp_origin = {
    latitude : -6.130435,
    longitude: -38.4014183,
}

const temp_destination = {
    lat : -6.112170799999999,
    lng: -38.3067149,
}


export default function RidePassengerExecution() {
    const {id} = useLocalSearchParams();

    const [origin, setOrigin] = useState<any>(null)
    const [destination, setDestination] = useState<any>(null)
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
        const socket = new WebSocket(`ws://192.168.0.9:8000/ws/rides/${id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }
    }

    useEffect(() => {
        connectSocket();
        setOrigin(temp_origin);
        setDestination(temp_destination);
    }, [])



    //// END SOCKET

    function handleOriginPlaceChange(data:any) {
        setOrigin({
            latitude: data.lat,
            longitude: data.lng
        })
    }

    async function requestLocalPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setOrigin({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            });
        }
    }

    useEffect(() => {
        requestLocalPermissions();
    }, [])

    useEffect(() => {
        if (origin && destination) {
            setTimeout(() => {
                mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                });
            }, 0);
        }
    }, [origin, destination]);

    useEffect(() => {
        const getTravelTime = async () => {
            if (origin && destination) {
                const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination.lat},${destination.lng}&language=pt-BR&mode=driving&key=${google_key}`;
                try {
                    const response = await fetch(URL);
                    const data = await response.json();
                    if (data.rows[0].elements[0].status === "OK") {
                        setDistance(data.rows[0].elements[0].distance.text);

                        const duration = data.rows[0].elements[0].duration.text
                        .replace(" horas", "h")
                        .replace(" hora", "h")
                        .replace(" minutos", "min")
                        .replace(" minuto", "min");
                        setDuration(duration);

                        const price = (data.rows[0].elements[0].distance.value * 0.00175).toFixed(2);
                        setPrice(parseFloat(price));
                    } else {
                        console.error("Error fetching distance data");
                    }
                } catch (error) {
                    console.error("Error fetching distance data", error);
                }
            }
        };
    
        getTravelTime();
    }, [origin, destination]);

    useEffect(() => {
        watchPositionAsync(
            {
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 10,
            },
            (location) => {
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        );
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


        </View>
    );
}