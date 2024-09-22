import { useState } from 'react';
import Map from '@/components/map/pilot/map';
import RidePilotExecution from '@/components/map/ridePilot/tracking';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import ridesService from '@/app/services/rides';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  const [hasRide, setHasRide] = useState(false);
  const { userToken, isLoading, user } = useContext(AuthContext);

  const service = new ridesService(userToken as string);


  useEffect(() => {
    const fetchRide = async () => {
      const response = await service.get_active_ride();
      if (response && response.status == 200) {
        if (response.data.passenger === user?.id){
          router.replace('/(app)/(passenger)')
        }
        setHasRide(true);
      }
    }
    fetchRide();
  }, [])

  const onRideRequest = () => {
    if (hasRide === true) {
      setHasRide(false);
    }else{
      setHasRide(true);
    }
  }



  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto" backgroundColor=''/>
      { hasRide ? (
        <RidePilotExecution onRide={() => onRideRequest()}></RidePilotExecution>
      ):(
        <Map onRide={() => onRideRequest()}></Map>
      )}
    </SafeAreaView>
  );
}

