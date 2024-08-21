import { StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { useState, useRef } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Marker } from 'react-native-maps';
import Map from '@/components/map/map';
export default function AppIndex() {


  return (
    <Map></Map>
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
