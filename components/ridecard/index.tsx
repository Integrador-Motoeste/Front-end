import React from 'react';
import { View, Text } from 'react-native';
import { style } from "./style";
import { MaterialIcons } from '@expo/vector-icons';

interface RideCardProps {
  origin: string;
  destination: string;
  value: number;
  status: string;
}

const truncateName = (name: string) => {
  if (name.length > 45) {
    return name.substring(0, 45) + '...';
  }
  return name;
};

const translateStatus = (status: string): string => {
  switch (status) {
    case "created":
      return "Criada";
    case "started":
      return "Iniciada";
    case "finished":
      return "Finalizada";
    case "canceled":
      return "Cancelada";
    default:
      return status;
  }
};

export const RideCardHistory: React.FC<RideCardProps> = ({ origin, destination, value, status }) => {
  const getStatusColor = (status: string) => {
    if (status === 'finished') {
      return style.completed;
    } else if (status === 'canceled') {
      return style.cancelled;
    } else if (status === 'started') {
      return style.inprogress;
    } else {
      return style.created;
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

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
        <Text style={style.price}>Valor: R$ {formatPrice(value)}</Text>
        <Text style={[style.status, getStatusColor(status)]}>
          {translateStatus(status)}
        </Text>
      </View>
    </View>
  );
};