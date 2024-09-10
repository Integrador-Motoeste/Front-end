import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '@/components/Themed';
import Map from '@/components/map/pilot/map';
import { useState } from 'react';
import { router } from 'expo-router';

export default function TabOneScreen() {


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
