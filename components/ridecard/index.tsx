import React from 'react';
import { View, Text} from 'react-native';
import { style } from "./style";
import {MaterialIcons} from '@expo/vector-icons';

interface RideCardProps {
    origin: string;
    destination: string;
    price: string;
    status: boolean;
  }
  
const truncateName = (name: string) => {
    if (name.length > 45) {
      return name.substring(0, 45) + '...';
    }
    return name;
};
  
export const RideCardHistory: React.FC<RideCardProps> = ({ origin, destination, price, status }) => {
  return (
    <View style={style.card}>
      <View style={style.row}>
        <MaterialIcons 
            name="radio-button-checked"
            size={20}
            color='#1FA0D8'
        />
         <Text style={style.text}>{truncateName(origin)}</Text>
      </View>
      <View style={style.row}>
        <MaterialIcons 
            name="place"
            size={20}
            color='#1FD87F'
        />
         <Text style={style.text}>{truncateName(destination)}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.price}>Valor: R$ {price}</Text>
        <Text style={[style.status, status ? style.completed : style.cancelled]}>
          {status ? 'Concluída' : 'Cancelada'}
        </Text>
      </View>
    </View>
  );
};