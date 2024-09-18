import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Map from '@/components/map/passenger/map';
import RidePassengerExecution from '@/components/map/ridePassenger/tracking';
import ridesService from '@/app/services/rides';
import { Ride } from '@/app/services/rides';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';


export default function TabOneScreen() {
  const [hasRide, setHasRide] = useState(false);
  const { userToken, isLoading, user } = useContext(AuthContext);
  const [ride, setRide] = useState(null);

  const service = new ridesService(userToken as string);

  useEffect(() => {
    const fetchRide = async () => {
      const response = await service.get_active_ride();
      if (response && response.status === 200) {
        console.log(response.data);
        setRide(response.data);
        setHasRide(true);
      }
    }
    fetchRide();
  }, [])

  const onRideRequest = () => {
    setHasRide(true);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto"/>
      { hasRide ? (
        <RidePassengerExecution></RidePassengerExecution>
      ):(
        <Map onRide={() => onRideRequest()}></Map>
      )}
    </SafeAreaView>
  );
}
