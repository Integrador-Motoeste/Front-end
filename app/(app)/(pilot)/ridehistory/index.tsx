import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState, useCallback } from 'react';
import { ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { style } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { RideCardHistory } from '../../../../components/ridecard/index';
import ridesService from "@/app/services/rides";
import { AuthContext } from "@/context/AuthContext";
import { Ride } from "@/app/services/rides";
import InvoiceService, { InvoiceCreate } from "@/app/services/invoices";
import Button from '@/components/Button';
import { router } from 'expo-router';

export default function RideHistory() {
    const [loading, setLoading] = useState(true);
    const [rides, setRides] = useState<Ride[] | null>(null);
    const [invoices, setInvoices] = useState<InvoiceCreate[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const { userToken } = useContext(AuthContext);

    const rideService = new ridesService(userToken || "");
    const invoiceService = new InvoiceService(userToken || "");

    const getRidesByUser = async () => {
        try {
            const response = await rideService.get_rides();
            if (response.status == 200) {
                const ridesData = response.data;
                setRides(ridesData);
    
                if (ridesData.length > 0) {
                    const invoicesPromises = ridesData.map(async (ride: Ride) => {
                        const invoiceResponse = await invoiceService.get_invoice_by_ride_id(ride.id);
                        return invoiceResponse?.data?.invoice || invoiceResponse?.data;
                    });
    
                    const invoicesResult = await Promise.all(invoicesPromises);
                    setInvoices(invoicesResult);
                }
            } else {
                setRides(null);
            }
        } catch (error) {
            console.error("Erro ao obter rides ou invoices do usuário:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (userToken) {
                getRidesByUser();
            }
            console.log(rides);
        }, [userToken])
    );

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
                    </View>
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

            <View style={style.filters}>
                    <View style={style.filterButtons}>
                        <TouchableOpacity onPress={() => setStatusFilter(null)}>
                            <Text style={statusFilter === null ? style.activeFilter : style.filterButton}>Todos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatusFilter('started')}>
                            <Text style={statusFilter === 'started' ? style.activeFilter : style.filterButton}>Iniciada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatusFilter('finished')}>
                            <Text style={statusFilter === 'finished' ? style.activeFilter : style.filterButton}>Finalizada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatusFilter('canceled')}>
                            <Text style={statusFilter === 'canceled' ? style.activeFilter : style.filterButton}>Cancelada</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {loading ? (
                <ActivityIndicator size="large" color="#1FD87F" />
            ) : (
                <ScrollView>
                    <View style={style.content}>
                        {!rides ? (
                            <Text style={style.noRidesText}>Falha ao carregar corridas</Text>
                        ) : rides.length === 0 ?
                            <Text style={style.noRidesText}>O Usuário não possui corridas</Text>
                        : (
                            rides
                                .filter(ride => !statusFilter || ride.status === statusFilter)
                                .map((ride) => {
                                    const invoice = invoices.find(inv => inv?.ride === ride.id);
                                    
                                    return (
                                        <RideCardHistory
                                            key={ride.id}
                                            origin={ride.origin || "Origem não definida"}
                                            destination={ride.destination || "Destino não definido"}
                                            value={Number(invoice?.value) || 0}
                                            status={ride.status}
                                        />
                                    );
                                })
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
