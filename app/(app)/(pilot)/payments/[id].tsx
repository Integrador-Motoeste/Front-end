import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView, Clipboard, View } from "react-native";
import InvoiceService, {InvoiceType, QRCodeType } from "@/app/services/invoices";
import { useState, useEffect } from "react";
import { 
    Header, HeaderName, Container, QRImage, PixContainer, PixInputContainer, PixCode,
    PixLabel, ValueContainer, Value, ValueLabel, InstructionText
} from "./styles";
import { truncateName } from "@/components/utils/truncate-text";
import { to_br_real } from "@/components/utils/to-real";
import CopyPastIcon from "@/assets/SVG/copypaste";
import Spinner from "@/components/spinnig";
import CheckIcon from "@/assets/SVG/check";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { measure } from "react-native-reanimated";
import Button from "@/components/Button";
import { RatingService } from "@/app/services/rating";
import { RatingComponent } from "@/components/rateUser";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Ride } from "@/app/services/rides";
import { router } from "expo-router";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string

export default function PaymentPilot (){
    const { id } = useLocalSearchParams()
    const { userToken, user } = useContext(AuthContext);

    const invoiceService = new InvoiceService(userToken as string)
    const [invoice, setInvoice] = useState<InvoiceType>()
    const [qrcode, setQrcode] = useState<QRCodeType>()	
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [socket, setSocket] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);


    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/payments/${id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }
    }

    const finish = () => {
        socket?.close();
        setIsLoading(false);
        setIsFinished(false);
        setQrcode(undefined);
        setInvoice(undefined);
        
        router.replace('/(app)/(pilot)')
    }

    const sendConfirmation = async () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
                type: 'confirmation',
                ride_id: id,
            });
            try {
                await socket.send(message);
                setIsFinished(true);
            } catch (error) {
                console.error("Error sending confirmation:", error);
            }
        } else {
            console.error("Websocket is not open");
        }
    };


    // Pega a fatura da corrida
    async function updateInvoice(){
        const response = await invoiceService.get_invoice(2)
        if (response.status === 200){
            setInvoice(response.data)
        }
    }

    // Processa a fatura
    async function process_invoice(){
        const response = await invoiceService.process_payment(2)
        console.log(response.data, response.status)
    }

    // Pega o QRCode da fatura
    async function get_qrcode(){
        if(invoice){
            if (invoice && invoice.status == 'completed'){
                setIsFinished(true)
            }
            const response = await invoiceService.get_qr_code(invoice?.id)
            setQrcode(response.data)
            setIsLoading(false)
        }
    }

    // Copia o payload para a área de transferência
    const copyToClipboard = () => {
        Clipboard.setString(qrcode?.payload || " ");
    };

    const fetchInvoice = async () => {
        setIsLoading(true)
        const response = await invoiceService.get_invoice_by_ride_id(id)
        if(response.status === 200){
            setInvoice(response.data)
            const data = response.data
            if (data.external_id == null) {
                await invoiceService.process_payment(data.id)
                
                const updated_invoice = await invoiceService.get_invoice_by_ride_id(id)
                setInvoice(updated_invoice.data)
            }            
        }
    }

    useFocusEffect(
        useCallback(() => {
            setIsLoading(false);
            setIsFinished(false);
            setQrcode(undefined);
            setInvoice(undefined);

            fetchInvoice();
            connectSocket();

            return () => {
                socket?.close();
            };
        }, [id])
    );

    useEffect(() => {
        if(invoice){
            get_qrcode()
        }
    }, [invoice])

    const handleOpenModal = () => {
        setModalVisible(true);
      };
    
    const handleConfirm = async (rating: number) => {
        if (!user || !userToken) return;
    
        const ratingService = new RatingService(userToken);
        try {
            const passangerId = invoice?.client_id;
            if (!passangerId) {
                console.error("ID do passageiro não encontrado");
                return;
            }
    
            await ratingService.createRating({
                rating: rating,
                user: passangerId,
                owner: user.id,
            });
    
            console.log('Avaliação enviada com sucesso');
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
        }
    
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="auto"/>
            <Header>
                <TouchableOpacity onPress={get_qrcode}>
                    <HeaderName>Pagamento</HeaderName>
                </TouchableOpacity>
            </Header>
                <Container>
                    { isLoading ? (
                            <Spinner size={100} color="#1FD87F"/>
                        ) : isFinished ? (
                            <>
                                <InstructionText>
                                    {isFinished ?
                                    ("Confirmado! Obrigado por utilizar nossos serviços."):
                                    ("Sua corrida foi finalizada! É possível o cliente realizar o pagamento com o código QR abaixo.")}
                                </InstructionText>
                                <View style={{
                                    margin: 20,
                                }}>
                                    <CheckIcon/>
                                </View>
                                <Button title="Voltar" onPress={finish}/>
                            </>
                        ) : (
                            <>
                                <InstructionText>
                                    {isFinished ?
                                    ("Confirmado! Obrigado por utilizar nossos serviços."):
                                    ("Sua corrida foi finalizada! É possível o cliente realizar o pagamento com o código QR abaixo.")}
                                    <Button title="Avaliar Motorista" onPress={handleOpenModal} />
                                </InstructionText>
                                <ValueContainer>
                                    <ValueLabel>
                                        Valor
                                    </ValueLabel>
                                    <Value>
                                        {to_br_real(invoice?.value || 0)}
                                    </Value>
                                </ValueContainer>
                                <QRImage
                                    source={{uri: `data:image/png;base64,${qrcode?.encodedImage}`}}
                                />
                                <Button onPress={sendConfirmation} title="Confirmar pagamento"/>
                            </>
                        )
                    }
                </Container>

                <RatingComponent
                    visible={modalVisible}
                    name="Damião Teodósio"
                    userImage="https://via.placeholder.com/40"
                    onCancel={() => setModalVisible(false)}
                    onConfirm={handleConfirm}
                    message="Avalie o Motorista"
                />

        </SafeAreaView>
    )
}