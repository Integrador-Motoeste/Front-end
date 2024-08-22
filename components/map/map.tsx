import { View, Text, KeyboardAvoidingView } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { style } from "./styles";
import DestinationInput from "./autocompletes/places";
import MapViewDirections from "react-native-maps-directions";
import Badge from "../badge/badge";
import RNPickerSelect from 'react-native-picker-select';
import Button from "../Button";

const google_key = process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string


export default function Map() {
 const [origin, setOrigin] = useState<any>(null)
 const [destination, setDestination] = useState<any>(null)

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

    // useEffect(() => {
    //     watchPositionAsync(
    //         {
    //             accuracy: LocationAccuracy.Highest,
    //             timeInterval: 1000,
    //             distanceInterval: 10,
    //         },
    //         (location) => {
    //             setOrigin({
    //                 latitude: location.coords.latitude,
    //                 longitude: location.coords.longitude,
    //             });
    //         }
    //     );
    // }, []);
    
    
    return (
        <View style={style.container}>

        
        { origin && 
            <MapView 
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
                >
                </Marker>
                { destination &&
                    <Marker
                    coordinate={{
                        latitude: destination.lat,
                        longitude: destination.lng,
                    }}
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
        }

        <View style={[
            origin && destination ? style.overmapfull : style.overmap
        ]}>
                { origin && destination &&
                    <DestinationInput placeholder="Localização Atual" setDestination={handleOriginPlaceChange}/>
                }
                <DestinationInput placeholder="Para onde vamos?" setDestination={setDestination}/>
                { origin && destination &&
                    <View style={style.confirmPopup}>
                        <View style={{
                            flexDirection: "row",
                            width: "80%",
                            justifyContent: "space-between",
                        }}>
                            <Badge value="10 Km"></Badge>
                            <Badge color="#34C17D" value="R$ 10"></Badge>
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
                            />
                        </View>
                        <Button style={{width: "80%"}} title="Confirmar"/>
                    </View>
                }
        </View>

    </View>
  );
}