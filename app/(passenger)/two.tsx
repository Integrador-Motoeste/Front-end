import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Alert, TouchableOpacity } from 'react-native';

export default function TabTwoScreen() {
    const [socket, setSocket] = useState<any>(null);
    const [passengerId, setPassengerId] = useState<any>(null);
    const [hasRide, setHasRide] = useState(false);

    const connectSocket = () => {
        const socket = io('http://192.168.0.9:8001', {
            extraHeaders: {
                'User-Type': "pilot",
                'User-Id': "10",
            }
        })

        socket.on('ride_request', (data: any) => {
            setPassengerId(data.passenger_id);
            setHasRide(true);
        });
        setSocket(socket);
    }

    const acceptRide = () => {
        if (socket) {
            socket.emit('respond_ride', { pilot_id: 1, passenger_id: passengerId, response: true });
            setHasRide(false);
        }
    }

    useEffect(() => {
        connectSocket();
    }, [])


  return (
    <View style={styles.container}>
      {hasRide && (
        <>
          <Text>Corrida Encontrada</Text>
          <TouchableOpacity onPress={acceptRide}>
            <Text>Aceitar corrida</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Recusar Corrida</Text>
          </TouchableOpacity>
        </>
      )}
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
});
