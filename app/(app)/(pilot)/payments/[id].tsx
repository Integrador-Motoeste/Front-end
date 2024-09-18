import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView, Clipboard, View } from "react-native";
import InvoiceService, { InvoiceType, QRCodeType } from "@/app/services/invoices";
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
const ws_base_url = process.env.EXPO_PUBLIC_WS_BACKEND_URL as string

export default function PaymentPilot (){
    const { id } = useLocalSearchParams()
    const invoiceService = new InvoiceService("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MDE3MjQ3LCJpYXQiOjE3MjYwMTYzNDcsImp0aSI6IjI1ZWY3MDQxZTNhODQ1OWJiZGY1NTEwNGQyOThkNjVjIiwidXNlcl9pZCI6MX0.ZEn2XT1uBGLmHHLLfcGh40gFPOr2-mS870BoCVmHNqA")
    const [invoice, setInvoice] = useState<InvoiceType>()
    const [qrcode, setQrcode] = useState<QRCodeType>()	
    const [isLoading, setIsLoafing] = useState<boolean>(false)
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [socket, setSocket] = useState<WebSocket | null>(null);


    const connectSocket = () => {
        const socket = new WebSocket(`${ws_base_url}/ws/payments/${id}/`)

        socket.onopen = () => {
            setSocket(socket);
        }
    }

    const sendConfirmation = async () => {
        const message = JSON.stringify({
            type: 'confirmation',
            ride_id: id,
        })
        await socket?.send(message)
    }

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
        const response = await invoiceService.get_qr_code(2)
        setQrcode(response.data)
    }

    // Copia o payload para a área de transferência
    const copyToClipboard = () => {
        Clipboard.setString(qrcode?.payload || " ");
    };

    useEffect(() => {
        connectSocket()
        updateInvoice()
        get_qrcode()
    },[])

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="auto"/>
            <Header>
                <TouchableOpacity onPress={get_qrcode}>
                    <HeaderName>Pagamento</HeaderName>
                </TouchableOpacity>
            </Header>
                {qrcode?.encodedImage && (
                <Container>
                    <InstructionText>
                        {isFinished ?
                        ("Confirmado! Obrigado por utilizar nossos serviços."):
                        ("Sua corrida foi finalizada! É possível o cliente realizar o pagamento com o código QR abaixo.")}
                    </InstructionText>
                    <ValueContainer>
                        <ValueLabel>
                            Valor
                        </ValueLabel>
                        <Value>
                            {to_br_real(invoice?.value || 0)}
                        </Value>
                    </ValueContainer>
                    { isLoading ? (
                            <Spinner size={100} color="#1FD87F"/>
                        ) : isFinished ? (
                            <View style={{
                                margin: 20,
                            }}>
                                <CheckIcon/>
                            </View>
                        ) : (
                            <QRImage
                                source={{uri: `data:image/png;base64,${qrcode?.encodedImage}`}}
                            />
                        )
                    }
                <Button onPress={sendConfirmation} title="Confirmar pagamento"/>
                </Container>
                )}
        </SafeAreaView>
    )
}