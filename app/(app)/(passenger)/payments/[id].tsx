import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView, ActivityIndicator, Clipboard } from "react-native";
import InvoiceService, { InvoiceType, QRCodeType } from "@/app/services/invoices";
import { useState, useEffect } from "react";
import { 
    Header, HeaderName, Container, QRImage, PixContainer, PixInputContainer, PixCode,
    PixLabel, ValueContainer, Value, ValueLabel, InstructionText
} from "./styles";
import { truncateName } from "@/components/utils/truncate-text";
import { to_br_real } from "@/components/utils/to-real";
import CopyPastIcon from "@/assets/SVG/copypaste";
import CheckIcon from "@/assets/SVG/check";
import Spinner from "@/components/spinnig";
import { router, useLocalSearchParams } from "expo-router";
import { RatingService } from "@/app/services/rating";
import { RatingComponent } from "@/components/rateUser";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Ride } from "@/app/services/rides";
import Button from "@/components/Button";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string


export default function PaymentPassenger(){
    const { userToken, user } = useContext(AuthContext);
    const { id } = useLocalSearchParams()
    const invoiceService = new InvoiceService(userToken as string)
    const [invoice, setInvoice] = useState<InvoiceType>()
    const [qrcode, setQrcode] = useState<QRCodeType>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFinished, setIsFinished] = useState<boolean>(false)	
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/payments/${id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }

        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type == 'confirmation'){
                setIsFinished(true);
            }
        }
    }


    const finish = () => {
        socket?.close();
        setIsLoading(false);
        setIsFinished(false);
        setQrcode(undefined);
        
        router.replace('/(app)/(passenger)')
    }

    // Pega a fatura da corrida
    async function updateInvoice(){
        const response = await invoiceService.get_invoice(2)
        if (response.status == 200){
            setInvoice(response.data)
        }
    }

    const fetchInvoice = async () => {
        setIsLoading(true)
        const response = await invoiceService.get_invoice_by_ride_id(id)
        if(response.status === 200){
            setInvoice(response.data)
            console.log("Invoice data: ", response.data);
            const data = response.data
            if (data.external_id == null) {
                await invoiceService.process_payment(data.id)
                
                const updated_invoice = await invoiceService.get_invoice_by_ride_id(id)
                setInvoice(updated_invoice.data)
            }            
        }
    }

    // Processa a fatura
    async function process_invoice(){
        console.log("Processing invoice with ID:", invoice?.id);
        const response = await invoiceService.process_payment(2)
        console.log(response.data, response.status)
    }

    // Pega o QRCode da fatura
    async function get_qrcode(){
        if(invoice){
            if (invoice && invoice.status == 'completed'){
                setIsFinished(true)
            }
            console.log("Invoice ID: ", invoice.id); // Verifique se o ID está correto
            const response = await invoiceService.get_qr_code(invoice?.id)
            setQrcode(response.data)
            setIsLoading(false)
        }
    }

    // Copia o payload para a área de transferência
    const copyToClipboard = () => {
        Clipboard.setString(qrcode?.payload || " ");
    };

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
            const driverId = invoice?.pilot_id;
            if (!driverId) {
                console.error("ID do motorista não encontrado");
                return;
            }
    
            await ratingService.createRating({
                rating: rating,
                user: driverId,
                owner: user.id,
            });
    
            console.log('Avaliação enviada com sucesso');
            finish();
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
                                    ("Sua corrida foi finalizada! É possível realizar o pagamento com o código PIX abaixo.")}
                            </InstructionText>
                            <View style={{
                                margin: 20,
                            }}>
                                <CheckIcon/>
                            </View>
                            <Button title="Voltar" onPress={finish}/>
                            <Button title="Avaliar Motorista" onPress={handleOpenModal} />
                        </>
                    ) : (
                        <>
                            <ValueContainer>
                                <ValueLabel>
                                    Valor
                                </ValueLabel>
                                <Value>
                                    {to_br_real(invoice?.value || 0)}
                                </Value>
                            </ValueContainer>
                            <PixContainer>
                                <PixLabel>
                                    Chave PIX
                                </PixLabel>
                                <PixInputContainer onPress={copyToClipboard}>
                                    <PixCode>
                                        {truncateName(qrcode?.payload || "", 20)}
                                    </PixCode>
                                    <CopyPastIcon/>
                                </PixInputContainer>
                            </PixContainer>
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