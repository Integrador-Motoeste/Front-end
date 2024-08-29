import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { style } from "./styles";
import DestinationInput from "./autocompletes/places";
import MapViewDirections from "react-native-maps-directions";
import Badge from "../badge/badge";
import RNPickerSelect from 'react-native-picker-select';
import Button from "../Button";
import { useRef } from "react";

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string


export default function Map() {
    const [origin, setOrigin] = useState<any>(null)
    const [destination, setDestination] = useState<any>(null)
    const [isTypingOrigin, setIsTypingOrigin] = useState(false);
    const [isTypingDestination, setIsTypingDestination] = useState(false);
    const mapRef = useRef<any>(null);

    const [distance, setDistance] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [price, setPrice] = useState<number>(0);


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

        
        { origin && 
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
                    longitude: origin.longitude
                }}
                identifier="origin"
                title="Origem"
                >
                </Marker>
                { destination &&
                    <Marker
                    coordinate={{
                        latitude: destination.lat,
                        longitude: destination.lng,
                    }}
                    identifier="destination"
                    title="Destino"
                    >
                    </Marker>
                }

                {origin && destination && (
                    <MapViewDirections
                    origin={{
                        latitude: origin.latitude,
                        longitude: origin.longitude
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
        }

        <View style={[
            origin && destination ? style.overmapfull : style.overmap, isTypingOrigin || isTypingDestination ? {bottom: 25} : {}
        ]}>
                { origin && destination && !isTypingOrigin &&
                    <DestinationInput isOrigin={true} setIsTyping={setIsTypingDestination} placeholder="Localização Atual" setDestination={handleOriginPlaceChange}/>
                }
                { !isTypingDestination &&
                    <DestinationInput isOrigin={false} setIsTyping={setIsTypingOrigin} placeholder="Para onde vamos?" setDestination={setDestination}/>
                }
                { origin && destination && !isTypingOrigin && !isTypingDestination &&
                    <View style={style.confirmPopup}>
                        <View style={{
                            flexDirection: "row",
                            width: "80%",
                            justifyContent: "space-around",
                        }}>
                            <Badge value={distance}></Badge>
                            <Badge value={duration}></Badge>
                            <Badge color={"#34C17D"} value={`R$ ${price}`}></Badge>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#34C17D",
                            borderRadius: 20,
                            width: "80%",
                        }}>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'Pix', value: 'pix' },
                                    { label: 'Cartão de Crédito', value: 'credit-card' },
                                ]}
                                placeholder={{label:"Pagamento", value: null}}
                            />
                        </View>
                        <Button style={{width: "80%"}} title="Confirmar"/>
                    </View>
                }
        </View>

    </View>
  );
}