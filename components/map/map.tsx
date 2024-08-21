import { View, Text } from "react-native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from "expo-location";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { style } from "./styles";
import DestinationInput from "./autocompletes/places";


export default function Map() {
 const [location, setLocation] = useState<LocationObject | null>(null)

    async function requestLocalPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

    useEffect(() => {
        requestLocalPermissions();
    }, [])

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 10,
        }, (response) => {
            setLocation(response);
        })
    }, []);
    
    return (
        <View style={style.container}>
        <DestinationInput />
        { location && 
            <MapView 
            style={style.map}
            initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
                <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}
                >

                </Marker>
            </MapView>
        }
    </View>
  );
}