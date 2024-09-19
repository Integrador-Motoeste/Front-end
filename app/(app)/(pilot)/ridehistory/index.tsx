import React from "react";
import {ScrollView, Text, View} from 'react-native';
import { style } from "./styles";
import {MaterialIcons} from '@expo/vector-icons';
import {RideCardHistory} from '../../../../components/ridecard/index'
import Button from "@/components/Button";
import { router } from "expo-router";

export default function RideHistory (){
    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.title}>Histórico de Corridas</Text>
                <View style={style.filters}>
                    <View style={style.filter}>
                        <MaterialIcons 
                            name="radio-button-checked"
                            size={20}
                            color='#1FA0D8'
                        />
                        <Text style={style.filterText}>Origem</Text>
                    <View style={style.filter}>
                        <MaterialIcons 
                            name="place"
                            size={20}
                            color='#1FD87F'
                        />
                        <Text style={style.filterText2}>Destino</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={style.content}>
                    <RideCardHistory
                    origin="Rua treze de Maio, Centro, Pau dos Ferros /RN"
                    destination="Instituto Federal de Educação, Ciência e Tecnologia"
                    price="12,50"
                    status={true}
                    />
                    <RideCardHistory
                    origin="Rua das Flores, Bairro Jardim, São Paulo /SP"
                    destination="Shopping Center Paulista"
                    price="25,00"
                    status={false}
                    />
                </View>
                </ScrollView>
        </View>
    )
}