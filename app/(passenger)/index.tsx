import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '@/components/Themed';
import Map from '@/components/map/passenger/map';

export default function TabOneScreen() {
  const [isSearching, setIsSearching] = useState(false); 

  const handleCancel = () => {
    setIsSearching(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto"/>
      <Map></Map>
    </SafeAreaView>
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
});
