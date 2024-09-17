import { useState } from 'react';
import Map from '@/components/map/pilot/map';
import RidePilotExecution from '@/components/map/ridePilot/tracking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function TabTwoScreen() {
  const [hasRide, setHasRide] = useState(false);

  const onRideRequest = () => {
    setHasRide(true);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto"/>
      { hasRide ? (
        //Passar corrida ativa por props
        <RidePilotExecution></RidePilotExecution>
      ):(
        <Map onRide={() => onRideRequest()}></Map>
      )}
    </SafeAreaView>
  );
}

