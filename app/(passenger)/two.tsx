import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Alert, TouchableOpacity } from 'react-native';
import Map from '@/components/map/pilot/map';


export default function TabTwoScreen() {

  return (
    <Map>
    </Map>
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
