import { StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { useState, useRef } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Marker } from 'react-native-maps';

export default function TabOneScreen() {
  const  mapRef = useRef<MapView>(null)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);

  function currentLoc(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
      };
      setCurrentLocation(pos)

      if (mapRef.current){
        console.log("CURRENTE LOCATION")
        mapRef.current.animateToRegion({
          latitude: pos.lat,
          longitude: pos.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      }
    });
  }
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <MapView ref={mapRef} style={styles.map}>{currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.lat,
              longitude: currentLocation.lng,
            }}
            title="Sua Localização"
            description="Você está aqui"
          />
        )}</MapView>
      <TouchableOpacity onPress={currentLoc}>
        <Text>Localizar minha localização</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  },
});
