import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { RideCardHistory } from '../../../../components/ridecard/index';
import ridesService from "@/app/services/rides";
import { AuthContext } from "@/context/AuthContext";
import { Ride } from "@/app/services/rides";
import InvoiceService, { InvoiceType } from "@/app/services/invoices";

export default function RideHistory() {
    const [loading, setLoading] = useState(true);
    const [rides, setRides] = useState<Ride[]>([]);
    const [invoices, setInvoices] = useState<InvoiceType[]>([]);
    const { userToken } = useContext(AuthContext);

    const rideService = new ridesService(userToken || "");
    const invoiceService = new InvoiceService(userToken || "");

    const getRidesByUser = async () => {
        try {
            const response = await rideService.get_rides();

            console.log("Resposta da API de rides:", response);

            if (response?.data) {
                const ridesData = response.data; 
                setRides(ridesData);

                if (ridesData.length > 0) {
                    const invoicesPromises = ridesData.map(async (ride: Ride) => {
                        const invoiceResponse = await invoiceService.get_invoice_by_ride_id(ride.id);
                        return invoiceResponse?.data?.invoice;
                    });

                    const invoicesResult = await Promise.all(invoicesPromises);
                    setInvoices(invoicesResult);
                }
            } else {
                console.warn("Nenhuma corrida encontrada.");
                setRides([]);
            }
        } catch (error) {
            console.error("Erro ao obter rides ou invoices do usuário:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userToken) {
            getRidesByUser();
        }
    }, [userToken]);

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

            {loading ? (
                <ActivityIndicator size="large" color="#1FD87F" />
            ) : (
                <ScrollView>
                    <View style={style.content}>
                        {rides.length === 0 ? (
                            <Text style={style.noRidesText}>O Usuário não possui corridas</Text>
                        ) : (
                            rides.map((ride) => {
                                const invoice = invoices.find(inv => inv?.ride_id === ride.id);
                                return (
                                    <RideCardHistory
                                        key={ride.id}
                                        origin={ride.origin || "Origem não definida"}
                                        destination={ride.destination || "Destino não definido"}
                                        value={invoice?.value || 0}
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
