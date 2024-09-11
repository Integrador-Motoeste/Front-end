import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Map from '@/components/map/passenger/map';
import RidePassengerExecution from '@/components/map/ridePassenger/tracking';


export default function TabOneScreen() {
  const [hasRide, setHasRide] = useState(true);

  const onRideRequest = () => {
    setHasRide(true);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto"/>
      { hasRide ? (
        //Passar corrida ativa por props
        <RidePassengerExecution></RidePassengerExecution>
      ):(
        <Map onRide={() => onRideRequest()}></Map>
      )}
    </SafeAreaView>
  );
}
